import { Meter } from '@opentelemetry/api';
import { CounterMetric } from './types';
import { MetricOptions } from '../../types';

/**
 * Creates a counter metric wrapper with consistent interface.
 *
 * @param meter - The OpenTelemetry meter instance
 * @param name - The name of the counter metric
 * @param opts - Optional metric options
 * @returns A CounterMetric wrapper
 */
export function createCounterMetric(
  meter: Meter,
  name: string,
  opts?: MetricOptions,
): CounterMetric {
  const counter = meter.createCounter(name, opts);

  return {
    add: (value: number, labels?: Record<string, string>) => {
      counter.add(value, labels);
    },
    increment: (labels?: Record<string, string>) => {
      counter.add(1, labels);
    },
  };
}
