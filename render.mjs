// render.mjs — rebuilds meme.png from meme.svg at 1024x1024.
//
// The SVG is the artwork's source of truth; this script is only the
// press. It prefers @resvg/resvg-js (a copy lives in this workspace
// under ../../render-tools) and falls back to ffmpeg's SVG reader, so
// the picture can be rebuilt on a fresh checkout with either tool.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const svgPath = join(here, "meme.svg");
const pngPath = join(here, "meme.png");
const require = createRequire(import.meta.url);

function loadResvg() {
  const candidates = [
    "@resvg/resvg-js",
    join(here, "..", "..", "render-tools", "node_modules", "@resvg", "resvg-js"),
  ];
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      // try the next candidate
    }
  }
  return null;
}

const resvgModule = loadResvg();
if (resvgModule) {
  const { Resvg } = resvgModule;
  const svg = readFileSync(svgPath);
  const renderer = new Resvg(svg, {
    fitTo: { mode: "width", value: 1024 },
    font: { loadSystemFonts: true },
  });
  writeFileSync(pngPath, renderer.render().asPng());
  console.log("meme.png rendered with @resvg/resvg-js");
} else {
  execFileSync("ffmpeg", [
    "-y", "-v", "error",
    "-i", svgPath,
    "-vf", "scale=1024:1024",
    pngPath,
  ]);
  console.log("meme.png rendered with ffmpeg");
}
