import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { industries, services } from "../site/catalog.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const pages = ["/", "/services/", ...services.map((item) => `/services/${item.slug}/`), "/industries/", ...industries.map((item) => `/industries/${item.slug}/`), "/work/", "/work/trueworker/", "/work/wikischools/"];
const failures = [];

for (const path of pages) {
  const filename = join(root, path.slice(1), "index.html");
  if (!existsSync(filename)) { failures.push(`Missing page: ${path}`); continue; }
  const html = readFileSync(filename, "utf8");
  if (!html.includes("<h1>")) failures.push(`Missing heading: ${path}`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const target = match[1].split(/[?#]/)[0];
    const targetFile = target.endsWith("/") ? join(root, target.slice(1), "index.html") : join(root, target.slice(1));
    if (!existsSync(targetFile)) failures.push(`Broken link on ${path}: ${match[1]}`);
  }
}

for (const industry of industries) {
  if (!readFileSync(join(root, "index.html"), "utf8").includes(`/industries/${industry.slug}/`)) failures.push(`Industry missing from homepage: ${industry.name}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} pages and their local links. All ${industries.length} industries are on the homepage.`);
}
