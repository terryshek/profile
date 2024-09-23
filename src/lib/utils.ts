import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fs from "fs";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getFolderDirectoryAllFiles(folder: string): string[] {
  return fs.existsSync(folder)
    ? fs
        .readdirSync(folder, { withFileTypes: true })
        .filter((item) => !item.isDirectory())
        .map((item) => item.name)
    : [];
}
