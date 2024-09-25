import * as js from "node:fs";
import path from "node:path";

const { existsSync, readdirSync } = js;

export function getFolderDirectoryAllFiles(folder: string): string[] {
  const directory = path.join(path.basename("/public"), "/static/", folder);

  return existsSync(directory)
    ? readdirSync(directory, { withFileTypes: true })
        .filter((item) => !item.isDirectory())
        .map((item) => {
          return item.name;
        })
    : [];
}
export function fileToNumber(file: string): number {
  return Number(file.split(".").slice(0, -1).join("."));
}
