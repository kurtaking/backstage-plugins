import { metrics, Meter } from '@opentelemetry/api';
import { CounterMetric } from "../types";
import { MetricsService, MetricsServicePluginOptions, MetricOptions } from "./MetricsService";
import { LoggerService } from '@backstage/backend-plugin-api';

export interface DefaultMetricsServiceOptions {
  logger: LoggerService;
  pluginId?: string;
}

export class DefaultMetricsService implements MetricsService {
  private meter: Meter;
  private logger: LoggerService;
  private pluginId?: string;

  private constructor (opts: DefaultMetricsServiceOptions) {
    this.meter = metrics.getMeter('backstage-default');
    this.logger = opts.logger;
  }

  public static create(opts: DefaultMetricsServiceOptions): MetricsService {
    return new DefaultMetricsService(opts);
  }

  forPlugin(opts: MetricsServicePluginOptions): MetricsService {
    return new DefaultMetricsService({
      logger: this.logger,
      pluginId: opts.pluginId,
    });
  }

  createCounter(name: string, opts?: MetricOptions): CounterMetric {
    const metricName = this.getMetricName(name);
    const counter = this.meter.createCounter(metricName, {
      ...opts,
    });

    return {
      add: (value: number = 1, labels?: Record<string, string>) => {
        if (value < 0) {
          throw new Error('Value must be an integer greater than 0');
        }

        counter.add(value, labels);
      },
    };
  }

  private getMetricName(name: string): string {
    if (this.pluginId) {
      return `${this.pluginId}.${name}`;
    }
    return name;
  }
}
