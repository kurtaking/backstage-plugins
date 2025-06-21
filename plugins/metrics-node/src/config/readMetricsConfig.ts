import { Config } from '@backstage/config';
import { MetricsConfig } from './types';
import { createDefaultMetricsConfig } from './createDefaultMetricsConfig';

export function readMetricsConfig(config: Config): MetricsConfig {
  const metricsConfig = config.getOptionalConfig('backend.metrics');

  if (!metricsConfig) {
    return createDefaultMetricsConfig();
  }

  return {
    enabled: metricsConfig.getOptionalBoolean('enabled'),
    resource: {
      serviceName: metricsConfig.getOptionalString('resource.serviceName'),
      serviceVersion: metricsConfig.getOptionalString('resource.serviceVersion'),
    },
    collection: {
      exportIntervalMillis: metricsConfig.getOptionalNumber('collection.exportIntervalMillis'),
      exportTimeoutMillis: metricsConfig.getOptionalNumber('collection.exportTimeoutMillis'),
    },
  };
}
