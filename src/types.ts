export type RenderProps = Record<string, unknown>;

export type RendererOptions = {
  /** Base directory for relative component names (default: "components") */
  baseDir?: string;
  /** React node used as Suspense fallback while lazy component loads */
  fallback?: import("react").ReactNode;
  /** Optional manifest mapping logical names => resolved paths (Next.js) */
  manifest?: Record<string, string>;
  /** Optional vite modules map from import.meta.glob — Vite adapter */
  viteModules?: Record<string, () => Promise<unknown>>;
};

export type RenderFn = (
  nameOrPath: string,
  props?: RenderProps
) => import("react").JSX.Element;
