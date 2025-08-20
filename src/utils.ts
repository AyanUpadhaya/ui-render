export function normalizeRequest(nameOrPath: string, baseDir: string): string {
  if (
    nameOrPath.startsWith("/") ||
    nameOrPath.startsWith(".") ||
    nameOrPath.includes("/")
  ) {
    return nameOrPath.replace(/^\.?\//, "");
  }
  return `${baseDir}/${nameOrPath}`;
}

export function stripExt(p: string): string {
  return p.replace(/\.(t|j)sx?$/, "");
}
