// src/browser/createRenderer.tsx
import { useState, useEffect } from "react";
import { jsx } from "react/jsx-runtime";
function createRenderer(options) {
  const {
    baseDir = "src/components",
    viteModules,
    manifest = {},
    debug = false
  } = options || {};
  const renderStack = /* @__PURE__ */ new Set();
  async function resolveComponent(normalizedPath) {
    if (manifest[normalizedPath]) {
      return import(
        /* @vite-ignore */
        manifest[normalizedPath]
      ).then(
        (m) => m.default
      );
    }
    if (viteModules) {
      const viteKey = `/${baseDir}/${normalizedPath}.tsx`;
      if (viteModules[viteKey]) {
        return viteModules[viteKey]().then((m) => m.default);
      }
    }
    return import(
      /* @vite-ignore */
      `@/${baseDir}/${normalizedPath}`
    ).then(
      (m) => m.default
    );
  }
  function RenderWrapper({
    componentPath,
    props
  }) {
    const [Comp, setComp] = useState(null);
    useEffect(() => {
      const normalizedPath = componentPath.replace(/^\/|\/$/g, "").replace(/\.(t|j)sx?$/, "");
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
      resolveComponent(normalizedPath).then((C) => setComp(() => C)).catch((err) => {
        debug && console.error("[ui-render] Failed to load", normalizedPath, err);
      }).finally(() => {
        renderStack.delete(normalizedPath);
      });
    }, [componentPath]);
    if (!Comp) return null;
    return /* @__PURE__ */ jsx(Comp, { ...props });
  }
  function render(componentPath, props) {
    return /* @__PURE__ */ jsx(RenderWrapper, { componentPath, props });
  }
  return render;
}
export {
  createRenderer
};
