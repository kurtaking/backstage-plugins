import { coreServices, createServiceFactory, createServiceRef } from "@backstage/backend-plugin-api";
import { createRootMetricsService } from "./createRootMetricsService";
import { RootMetricsService } from "../../definitions";
import { readMetricsConfig } from "../../config";

/**
 * Service reference for the root metrics service.
 *
 * @public
 */
export const rootMetricsServiceRef = createServiceRef<RootMetricsService>({
  id: 'core.rootMetrics',
  scope: 'root',
});

/**
 * Service factory for the root metrics service.
 *
 * @public
 */
export const rootMetricsServiceFactory = createServiceFactory({
  service: rootMetricsServiceRef,
  deps: {
    rootLogger: coreServices.rootLogger,
    rootConfig: coreServices.rootConfig,
  },
  async factory({ rootLogger, rootConfig }) {
    rootLogger.info('Creating root metrics service');

    return await createRootMetricsService({
      config: readMetricsConfig(rootConfig),
    });
  },
});
