import { Meter, metrics } from "@opentelemetry/api";
import { CounterMetric } from "../types";
import { MetricOptions, MetricsService } from "./MetricsService";

export class PluginMetricsService implements MetricsService {
  private meter: Meter;

  constructor (private readonly pluginId: string) {
    this.meter = metrics.getMeter(`backstage.plugin.${this.pluginId}`);
  }

  createCounter(name: string, opts?: MetricOptions): CounterMetric {
    const counter = this.meter.createCounter(name, {
      ...opts,
    });

    return {
      add: (value: number = 1, labels?: Record<string, string>) => {
        counter.add(value, labels);
      },
    };
  }
}
