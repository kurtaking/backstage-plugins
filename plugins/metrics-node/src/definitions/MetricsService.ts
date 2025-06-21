import { CounterMetric, UpDownCounterMetric } from '../instruments/counter';
import { MetricOptions } from '../types';

export interface MetricsService {
  createCounter(name: string, opts?: MetricOptions): CounterMetric;
  createUpDownCounter(name: string, opts?: MetricOptions): UpDownCounterMetric;
}
