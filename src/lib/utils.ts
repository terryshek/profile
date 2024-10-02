import * as js from "node:fs";
import path from "node:path";
import dayjs from "dayjs";

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
export function splitCamelCaseToString(s: string): string {
  return s
    .split(/(?=[A-Z])/)
    .map(function (p) {
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(" ");
}
export function formatDate(date: string): string {
  return `${dayjs(date).format("MMM / YYYY")}`;
}
export function detectUrl(text: string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return (
      '<div><a href="' +
      url +
      '" class="pt-2 text-sky-950 font-medium">' +
      url +
      "</a></div>"
    );
  });
}
