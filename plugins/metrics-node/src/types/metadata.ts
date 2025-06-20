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
