import { metrics, Meter } from '@opentelemetry/api';
import { CounterMetric } from "../types";
import { MetricsService, MetricOptions, MetricsServicePluginOptions } from "./MetricsService";
import { coreServices, createServiceFactory, createServiceRef, LoggerService } from '@backstage/backend-plugin-api';
import { PluginMetricsService } from './PluginMetricsService';

export interface RootMetricsService extends MetricsService {
  forPlugin(opts: MetricsServicePluginOptions): MetricsService;
}

export class RootMetricsServiceImpl implements RootMetricsService {
  private readonly meter: Meter;

  private constructor (private readonly logger: LoggerService) {
    this.meter = metrics.getMeter('backstage');
  }

  public static create(logger: LoggerService): RootMetricsService {
    return new RootMetricsServiceImpl(logger);
  }

  forPlugin(opts: MetricsServicePluginOptions): MetricsService {
    this.logger.info('Creating plugin metrics service for plugin', { pluginId: opts.pluginId });
    return new PluginMetricsService(opts.pluginId);
  }

  createCounter(name: string, opts?: MetricOptions): CounterMetric {
    return {
      add: (value: number = 1, labels?: Record<string, string>) => {
        this.meter.createCounter(name, {
          ...opts,
        }).add(value, labels);
      },
    };
  }
}

export const rootMetricsServiceRef = createServiceRef<RootMetricsService>({
  id: 'core.rootMetrics',
  scope: 'root',
  defaultFactory: async service => {
    return createServiceFactory({
      service,
      deps: {
        rootLogger: coreServices.rootLogger,
      },
      factory({ rootLogger }) {
        return RootMetricsServiceImpl.create(rootLogger);
      },
    });
  },
});
