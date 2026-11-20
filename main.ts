// main.ts — the whole program for this make.fun entry, and it is
// deliberately tiny.
//
// The entry itself is a post on X (see POST.json for its address and
// README.md for the story). The grader runs this file with Node 22+ and
// expects exactly one thing from it: a copy of POST.json, byte for byte,
// placed in the output directory it names. The source directory and the
// output directory both arrive through the environment, with the
// production paths as defaults:
//
//   MAKEFUN_BOT_DIR     where this repository lives   (default "/bot")
//   MAKEFUN_OUTPUT_DIR  where POST.json must end up   (default "/output")
//
// On success the program prints nothing. On any failure it says what
// went wrong on stderr and exits with code 1, so a broken hand-in can
// never look like a good one.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const sourceDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  // recursive: true also makes this a no-op when the directory the
  // harness prepared is already there.
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(join(sourceDir, "POST.json"), join(targetDir, "POST.json"));
} catch (problem) {
  const detail = problem instanceof Error ? problem.message : String(problem);
  console.error(`main.ts: failed to deliver POST.json (${detail})`);
  process.exit(1);
}
