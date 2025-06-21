import { MetricsCollectionConfig, ResourceConfig, MetricsConfig } from "./types";

const collectionConfig: Required<MetricsCollectionConfig> = {
  exportIntervalMillis: 60000,
  exportTimeoutMillis: 5000,
};

const resourceConfig: Required<ResourceConfig> = {
  serviceName: 'backstage',
  serviceVersion: '0.0.0',
};

export const createDefaultMetricsConfig = (): Required<MetricsConfig> => {
  return {
    enabled: true,
    resource: resourceConfig,
    collection: collectionConfig,
  };
};
