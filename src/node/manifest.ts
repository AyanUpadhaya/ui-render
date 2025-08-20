// node/manifest.ts
import fg from "fast-glob";
import { writeFileSync } from "fs";
import { resolve } from "path";

export async function buildManifest(
  globPattern: string = "src/components/**/*.{tsx,jsx}"
) {
  const cwd = process.cwd();
  const entries = await fg(globPattern, { cwd });
  const manifest: Record<string, string> = {};

  for (const file of entries) {
    // Remove "src/" and extension for the key
    const withoutSrc = file.replace(/^src\//, "");
    const withoutExt = withoutSrc.replace(/\.(t|j)sx?$/, "");
    const componentName = withoutExt.replace(/^components\//, ""); // -> "Hero", "About"

    // ✅ Use absolute-from-root path so Vite resolves it properly
    manifest[componentName] = `/src/${file.replace(/^src\//, "")}`;
    // Example: "Hero": "/src/components/Hero.tsx"
  }

  const outPath = resolve(cwd, "component.manifest.json");
  writeFileSync(outPath, JSON.stringify(manifest, null, 2));
  return manifest;
}
