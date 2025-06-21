
export interface ResourceConfig {
  serviceName?: string;
  serviceVersion?: string;
}

export interface MetricsCollectionConfig {
  exportIntervalMillis?: number;
  exportTimeoutMillis?: number;
}

export interface MetricsConfig {
  enabled?: boolean;
  resource?: ResourceConfig;
  collection?: MetricsCollectionConfig;
}
