import { MetricsService } from "./MetricsService";

/**
 * Options for creating a plugin-scoped metrics service.
 *
 * @public
 */
export interface MetricsServicePluginOptions {
  pluginId: string;
}

export interface RootMetricsService extends MetricsService {
  forPlugin(opts: MetricsServicePluginOptions): MetricsService;
}
