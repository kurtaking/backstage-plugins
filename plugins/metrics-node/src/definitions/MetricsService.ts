import { CounterMetric } from "../types";

export interface MetricsService {
  createCounter(name: string, opts?: MetricOptions): CounterMetric;
}

export interface MetricOptions {
  description?: string;
  labels?: Record<string, string>;
}
