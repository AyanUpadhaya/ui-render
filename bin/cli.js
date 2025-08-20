#!/usr/bin/env node
import { buildManifest } from "ui-render/node";

const pattern = process.argv[2] || "src/components/**/*.{tsx,jsx}";
buildManifest(pattern)
  .then((outPath) => console.log(`✓ Manifest generated in root directory`))
  .catch((e) => {
    console.error("✗ Manifest generation failed");
    console.error(e);
    process.exit(1);
  });
