import { coreServices, createServiceFactory, createServiceRef } from '@backstage/backend-plugin-api';
import { MetricsService } from './MetricsService';
import { DefaultMetricsService } from './DefaultMetricsService';

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
        logger: coreServices.logger,
        pluginMetadata: coreServices.pluginMetadata,
      },
      factory({ logger, pluginMetadata }) {
        return DefaultMetricsService.create({
          logger,
        }).forPlugin({
          pluginId: pluginMetadata.getId(),
        });
      },
    });
  },
});
