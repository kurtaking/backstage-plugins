import { createServiceRef, createServiceFactory, coreServices } from "@backstage/backend-plugin-api";
import { RootMetricsService } from "../../definitions";
import { createRootMetricsService } from "./createRootMetricsService";

/**
 * Service reference for the root metrics service.
 *
 * @public
 */
export const rootMetricsServiceRef = createServiceRef<RootMetricsService>({
  id: 'core.rootMetrics',
  scope: 'root',
  defaultFactory: async service => {
    return createServiceFactory({
      service,
      deps: {
        rootLogger: coreServices.rootLogger,
      },
      async factory({ rootLogger }) {
        return await createRootMetricsService({ logger: rootLogger });
      },
    });
  },
});
