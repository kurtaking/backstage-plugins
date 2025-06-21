import { CounterMetric, UpDownCounterMetric } from '../types';

export interface MetricsService {
  createCounter(name: string, opts?: MetricOptions): CounterMetric;
  createUpDownCounter(name: string, opts?: MetricOptions): UpDownCounterMetric;
}

export interface MetricOptions {
  description?: string;
  labels?: Record<string, string>;
}
