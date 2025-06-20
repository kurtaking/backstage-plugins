import { coreServices, createServiceFactory, createServiceRef } from '@backstage/backend-plugin-api';
import { MetricsService } from './MetricsService';
import { rootMetricsServiceRef } from './RootMetricsService';

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
        rootMetricsService: rootMetricsServiceRef,
      },
      factory({ pluginMetadata, rootMetricsService }) {
        return rootMetricsService.forPlugin({
          pluginId: pluginMetadata.getId(),
        });
      },
    });
  },
});
