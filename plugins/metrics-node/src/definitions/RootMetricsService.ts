import { RootLoggerService } from '@backstage/backend-plugin-api';
import { MetricsService } from "./MetricsService";

/**
 * Options for creating a plugin-scoped metrics service.
 *
 * @public
 */
export interface MetricsServicePluginOptions {
  pluginId: string;
}

export interface RootMetricsServiceOptions {
  logger: RootLoggerService;
}

export interface RootMetricsService extends MetricsService {
  forPlugin(opts: MetricsServicePluginOptions): MetricsService;
}
