import { metrics, Meter } from '@opentelemetry/api';
import {
  ConsoleMetricExporter,
  MeterProvider,
  PeriodicExportingMetricReader
} from '@opentelemetry/sdk-metrics';
import { defaultResource, resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { MetricsService, RootMetricsService, MetricsServicePluginOptions } from '../../definitions';
import { MetricOptions } from '../../types';
import { PluginMetricsService } from '../PluginMetricsService';
import { CounterMetric, createCounterMetric, UpDownCounterMetric, createUpDownCounterMetric } from '../../instruments/counter';
import { MetricsConfig } from '../../config';

interface RootMetricsServiceOptions {
  config: MetricsConfig;
}

export async function createRootMetricsService(options: RootMetricsServiceOptions): Promise<RootMetricsService> {
  const { config } = options;

  const rootServiceName = config.resource?.serviceName ?? 'backstage';
  const rootServiceVersion = config.resource?.serviceVersion ?? '0.0.0';

  const resource = defaultResource().merge(
    resourceFromAttributes({
      [ATTR_SERVICE_NAME]: rootServiceName,
      [ATTR_SERVICE_VERSION]: rootServiceVersion,
    }),
  );

  const metricReader = new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
    exportIntervalMillis: config.collection?.exportIntervalMillis ?? 60000, // 60 seconds
  });

  const provider = new MeterProvider({
    resource,
    readers: [metricReader],
  });

  metrics.setGlobalMeterProvider(provider);

  const meter: Meter = metrics.getMeter(rootServiceName);

  const forPlugin = (opts: MetricsServicePluginOptions): MetricsService => {
    return new PluginMetricsService(opts.pluginId, rootServiceName);
  };

  const createCounter = (name: string, opts?: MetricOptions): CounterMetric => {
    return createCounterMetric(meter, name, opts);
  };

  const createUpDownCounter = (name: string, opts?: MetricOptions): UpDownCounterMetric => {
    return createUpDownCounterMetric(meter, name, opts);
  };

  return {
    forPlugin,
    createCounter,
    createUpDownCounter,
  };
}
