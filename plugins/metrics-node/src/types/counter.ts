/**
 * A counter metric.
 *
 * @public
 */
export interface CounterMetric {
  /**
   * Increment the counter by the specified value.
   *
   * @param value - The amount to increment by.
   * @param labels - Additional labels for this observation
   *
   * @public
   */
  add(value: number, labels?: Record<string, string>): void;

  /**
   * Increment the counter by 1 with optional labels.
   *
   * @param labels - Additional labels for this observation
   *
   * @remarks
   * If you need to increment by a value other than 1, use the `add` method.
   *
   * @public
   */
  increment(labels?: Record<string, string>): void;
}
