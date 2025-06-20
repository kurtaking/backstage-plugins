import { CounterMetric } from "../types";
import { MetricOptions } from "../types/metadata";

export interface MetricsService {
  createCounter(name: string, options?: MetricOptions): CounterMetric;
}
