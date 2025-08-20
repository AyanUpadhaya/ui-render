import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';

interface RendererOptions$1 {
    baseDir?: string;
    viteModules?: Record<string, () => Promise<any>>;
    manifest?: Record<string, string>;
    debug?: boolean;
}
declare function createRenderer(options?: RendererOptions$1): (componentPath: string, props?: any) => react_jsx_runtime.JSX.Element;

type RenderProps = Record<string, unknown>;
type RendererOptions = {
    /** Base directory for relative component names (default: "components") */
    baseDir?: string;
    /** React node used as Suspense fallback while lazy component loads */
    fallback?: react.ReactNode;
    /** Optional manifest mapping logical names => resolved paths (Next.js) */
    manifest?: Record<string, string>;
    /** Optional vite modules map from import.meta.glob — Vite adapter */
    viteModules?: Record<string, () => Promise<unknown>>;
};
type RenderFn = (nameOrPath: string, props?: RenderProps) => react.JSX.Element;

export { type RenderFn, type RendererOptions, createRenderer };
