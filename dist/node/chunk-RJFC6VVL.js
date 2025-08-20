// src/node/manifest.ts
import fg from "fast-glob";
import { writeFileSync } from "fs";
import { resolve } from "path";
async function buildManifest(globPattern = "src/components/**/*.{tsx,jsx}") {
  const cwd = process.cwd();
  const entries = await fg(globPattern, { cwd });
  const manifest = {};
  for (const file of entries) {
    const withoutSrc = file.replace(/^src\//, "");
    const withoutExt = withoutSrc.replace(/\.(t|j)sx?$/, "");
    const componentName = withoutExt.replace(/^components\//, "");
    manifest[componentName] = `/src/${file.replace(/^src\//, "")}`;
  }
  const outPath = resolve(cwd, "component.manifest.json");
  writeFileSync(outPath, JSON.stringify(manifest, null, 2));
  return manifest;
}

export {
  buildManifest
};
