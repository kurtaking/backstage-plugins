import { Meter } from "@opentelemetry/api";
import { UpDownCounterMetric } from "./types";
import { MetricOptions } from "../../types";

/**
 * Creates an up-down counter metric wrapper with consistent interface.
 *
 * @param meter - The OpenTelemetry meter instance
 * @param name - The name of the up-down counter metric
 * @param opts - Optional metric options
 * @returns An UpDownCounterMetric wrapper
 */
export function createUpDownCounterMetric(
  meter: Meter,
  name: string,
  opts?: MetricOptions,
): UpDownCounterMetric {
  const counter = meter.createUpDownCounter(name, opts);

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
