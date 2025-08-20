"use client";
import React, { useState, useEffect } from "react";

interface RendererOptions {
  baseDir?: string;
  viteModules?: Record<string, () => Promise<any>>;
  manifest?: Record<string, string>;
  debug?: boolean;
}

export function createRenderer(options?: RendererOptions) {
  const {
    baseDir = "src/components",
    viteModules,
    manifest = {},
    debug = false,
  } = options || {};

  // Keep track of active renders to prevent self-recursion
  const renderStack = new Set<string>();

  async function resolveComponent(normalizedPath: string) {
    if (manifest[normalizedPath]) {
      return import(/* @vite-ignore */ manifest[normalizedPath]).then(
        (m) => m.default
      );
    }

    if (viteModules) {
      const viteKey = `/${baseDir}/${normalizedPath}.tsx`;
      if (viteModules[viteKey]) {
        return viteModules[viteKey]().then((m) => m.default);
      }
    }

    return import(/* @vite-ignore */ `@/${baseDir}/${normalizedPath}`).then(
      (m) => m.default
    );
  }

  function RenderWrapper({
    componentPath,
    props,
  }: {
    componentPath: string;
    props?: any;
  }) {
    const [Comp, setComp] = useState<React.ComponentType | null>(null);

    useEffect(() => {
      const normalizedPath = componentPath
        .replace(/^\/|\/$/g, "")
        .replace(/\.(t|j)sx?$/, "");

      if (debug) {
        console.log("[ui-render] Looking for:", normalizedPath);
      }

      if (renderStack.has(normalizedPath)) {
        console.error(
          `[ui-render] Infinite recursion detected: "${normalizedPath}" is trying to render itself.`
        );
        return;
      }

      renderStack.add(normalizedPath);

      resolveComponent(normalizedPath)
        .then((C) => setComp(() => C))
        .catch((err) => {
          debug &&
            console.error("[ui-render] Failed to load", normalizedPath, err);
        })
        .finally(() => {
          renderStack.delete(normalizedPath);
        });
    }, [componentPath]);

    if (!Comp) return null;
    return <Comp {...props} />;
  }

  function render(componentPath: string, props?: any) {
    return <RenderWrapper componentPath={componentPath} props={props} />;
  }

  return render;
}
