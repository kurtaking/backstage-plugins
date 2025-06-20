import { CounterMetric } from "../types";
import { MetricOptions } from "../types/metadata";

export interface MetricsServicePluginOptions {
  pluginId: string;
}
export interface MetricsService {
  forPlugin(opts: MetricsServicePluginOptions): MetricsService;

  createCounter(name: string, opts?: MetricOptions): CounterMetric;
}
