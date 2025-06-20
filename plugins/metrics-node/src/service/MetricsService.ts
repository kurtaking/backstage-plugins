import { CounterMetric } from "../types";

export interface MetricsServicePluginOptions {
  pluginId: string;
}

export interface MetricOptions {
  /**
   * The description of the Metric.
   */
  description?: string;

  /**
   * Optional static labels that will be attached to all observations.
   */
  labels?: Record<string, string>;
}


export interface MetricsService {
  forPlugin(opts: MetricsServicePluginOptions): MetricsService;

  createCounter(name: string, opts?: MetricOptions): CounterMetric;
}
