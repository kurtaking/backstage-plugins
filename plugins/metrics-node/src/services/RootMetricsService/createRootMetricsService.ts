import { metrics, Meter } from '@opentelemetry/api';
import { RootLoggerService } from '@backstage/backend-plugin-api';
import { MetricsService, RootMetricsService, MetricsServicePluginOptions, MetricOptions } from '../../definitions';
import { PluginMetricsService } from '../PluginMetricsService';
import { CounterMetric } from '../../types';

export interface RootMetricsServiceOptions {
  logger: RootLoggerService;
}

export async function createRootMetricsService(opts: RootMetricsServiceOptions): Promise<RootMetricsService> {
  const meter = metrics.getMeter('backstage');

  const forPlugin = (pluginOpts: MetricsServicePluginOptions): MetricsService => {
    opts.logger.info('Creating scoped metrics service for plugin', { pluginId: pluginOpts.pluginId });
    return new PluginMetricsService(pluginOpts.pluginId);
  };

  const createCounter = (name: string, counterOpts?: MetricOptions): CounterMetric => {
    return {
      add: (value: number, labels?: Record<string, string>) => {
        meter.createCounter(name, counterOpts).add(value, labels);
      },
      increment: (labels?: Record<string, string>) => {
        meter.createCounter(name, counterOpts).add(1, labels);
      },
    };
  };

  return {
    forPlugin,
    createCounter,
  };
}
