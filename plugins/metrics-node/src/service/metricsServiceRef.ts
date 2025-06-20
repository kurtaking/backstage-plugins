import { createServiceFactory, createServiceRef } from '@backstage/backend-plugin-api';
import { MetricsService } from './MetricsService';

/**
 * Service reference for the metrics service.
 *
 * @public
 */
export const metricsServiceRef = createServiceRef<MetricsService>({
  id: 'core.metrics',
  scope: 'plugin',
  defaultFactory: async service => {
    return createServiceFactory({
      service,
      deps: {
      },
      factory() {
        throw new Error('Metrics service is not implemented');
      },
    });
  },
});
