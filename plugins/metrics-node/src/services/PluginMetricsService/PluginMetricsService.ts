import { Meter, metrics } from "@opentelemetry/api";
import { CounterMetric, UpDownCounterMetric } from "../../types";
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

  createUpDownCounter(name: string, opts?: MetricOptions): UpDownCounterMetric {
    const counter = this.meter.createUpDownCounter(name, opts);

    return {
      add: (value: number, labels?: Record<string, string>) => {
        counter.add(value, labels);
      },

      subtract: (value: number, labels?: Record<string, string>) => {
        counter.add(-value, labels);
      },

      increment: (labels?: Record<string, string>) => {
        counter.add(1, labels);
      },

      decrement: (labels?: Record<string, string>) => {
        counter.add(-1, labels);
      },
    };
  }
}
