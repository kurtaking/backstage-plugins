import { Meter, metrics } from "@opentelemetry/api";
import { MetricsService } from "../../definitions";
import { MetricOptions } from "../../types";
import { CounterMetric, createCounterMetric, UpDownCounterMetric, createUpDownCounterMetric } from "../../instruments/counter";

export class PluginMetricsService implements MetricsService {
  private meter: Meter;

  constructor (private readonly pluginId: string, rootServiceName: string) {
    this.meter = metrics.getMeter(`${rootServiceName}.plugin.${this.pluginId}`);
  }

  createCounter(name: string, opts?: MetricOptions): CounterMetric {
    return createCounterMetric(this.meter, name, opts);
  }

  createUpDownCounter(name: string, opts?: MetricOptions): UpDownCounterMetric {
    return createUpDownCounterMetric(this.meter, name, opts);
  }
}
