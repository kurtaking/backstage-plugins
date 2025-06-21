import { Meter, metrics } from "@opentelemetry/api";
import { CounterMetric } from "../../types";
import { MetricOptions, MetricsService } from "../../definitions";

export class PluginMetricsService implements MetricsService {
  private meter: Meter;

  constructor (private readonly pluginId: string, rootServiceName: string) {
    this.meter = metrics.getMeter(`${rootServiceName}.plugin.${this.pluginId}`);
  }

  createCounter(name: string, opts?: MetricOptions): CounterMetric {
    const counter = this.meter.createCounter(name, opts);

    return {
      add: (value: number, labels?: Record<string, string>) => {
        counter.add(value, labels);
      },

      increment: (labels?: Record<string, string>) => {
        counter.add(1, labels);
      },
    };
  }
}
