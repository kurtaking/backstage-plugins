import { metrics, Meter } from '@opentelemetry/api';
import { CounterMetric } from "../types";
import { MetricsService } from "./MetricsService";
import { MetricOptions } from "../types/metadata";

export class DefaultMetricsService implements MetricsService {
  private meter: Meter;

  private constructor () {
    this.meter = metrics.getMeter('backstage-default');
  }

  public static create(): MetricsService {
    return new DefaultMetricsService();
  }

  createCounter(name: string, opts?: MetricOptions): CounterMetric {
    const counter = this.meter.createCounter(name, {
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
}
