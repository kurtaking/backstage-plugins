import { coreServices, createServiceFactory } from "@backstage/backend-plugin-api";
import { rootMetricsServiceRef } from "./rootMetricsServiceRef";
import { createRootMetricsService } from "./createRootMetricsService";

/**
 * Service factory for the root metrics service.
 *
 * @public
 */
export const rootMetricsServiceFactory = createServiceFactory({
  service: rootMetricsServiceRef,
  deps: {
    rootLogger: coreServices.rootLogger,
  },
  async factory({ rootLogger }) {
    return await createRootMetricsService({ logger: rootLogger });
  },
});
