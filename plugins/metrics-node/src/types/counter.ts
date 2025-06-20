export interface CounterMetric {
  add(value?: number, labels?: Record<string, string>): void;
}
