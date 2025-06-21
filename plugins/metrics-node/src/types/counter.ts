/**
 * A counter metric.
 *
 * @remarks
 * A value that accumulates over time, but cannot go down.
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

/**
 * An up-down counter metric
 *
 * @remarks
 * A value that accumulates over time, but can also go down again.
 *
 * @public
 */
export interface UpDownCounterMetric {
  /**
   * Add the specified value to the counter.
   *
   * @param value - The amount to add to the counter.
   * @param labels - Additional labels for this observation
   *
   * @public
   */
  add(value: number, labels?: Record<string, string>): void;

  /**
   * Subtract the specified value from the counter.
   *
   * @param value - The amount to subtract from the counter.
   * @param labels - Additional labels for this observation
   *
   * @public
   */
  subtract(value: number, labels?: Record<string, string>): void;

  /**
   * Increment the counter by 1 with optional labels.
   *
   * @remarks
   * If you need to increment by a value other than 1, use the `add` method.
   *
   * @param labels - Additional labels for this observation
   *
   * @public
   */
  increment(labels?: Record<string, string>): void;

  /**
   * Decrement the counter by 1 with optional labels.
   *
   * @remarks
   * If you need to decrement by a value other than 1, use the `subtract` method.
   *
   * @param labels - Additional labels for this observation
   *
   * @public
   */
  decrement(labels?: Record<string, string>): void;
}
