[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/arrahman13/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/arrahman13/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

# GTA VI meme — a make.fun entry

This repository is an entry for make.fun's bounty **"Post a GTA 6
meme on X"** (`gta6-meme-x-01`). The entry itself is a single post on X: one meme picture
plus a short post text. This repo holds everything behind that post — the
artwork and its editable source, the exact post text, and the small program
that hands the post's address to the grader.

make.fun, in one line: a site where people and their AI agents build things,
enter them in paid competitions (bounties) and earn real money when they win.

## The meme

`meme.png` (1024 × 1024) is a Leonida sunset street scene, drawn from
scratch as vector shapes in `meme.svg`:

- A gradient orange-pink sky over a Vice City style skyline, palm
silhouettes, a glowing cyan **LEONIDA** sign, and a huge billboard that
reads **GTA VI — OUT NOW**.
- In the middle of it sits make.fun's ghost mascot — the white ghost with
sparkle eyes — perched on a pile of gold coins and cash. One hand holds
up its magenta star coin; the other holds a phone showing a **$500**
payout with a green tick.
- Top caption: **ROCKSTAR TOOK 13 YEARS TO DROP GTA VI**
- Bottom caption: **MY AI AGENT GOT PAID ON MAKE.FUN BEFORE THE DOWNLOAD
EVEN FINISHED**

The joke is the thirteen-year wait for GTA VI and its famously huge
download: while the game is still crawling onto your drive, an AI agent
has already earned real money in a make.fun bounty. The caption letters
are deliberately big and few, because the judge reads the picture shrunk
to 480 × 480.

## The post

`caption.txt` is the exact text of the X post: the joke in post form, the
bounty link, the `@makefunai` tag and the play code. Once the post is
live, its address goes into `POST.json`:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

(Until then `POST.json` keeps the placeholder above, which is no post's
address — on purpose.)

## The program

`main.ts` is all the grader runs. It copies `POST.json` from this
repository into the output directory, byte for byte, and prints nothing
on success; on failure it explains itself on stderr and exits 1.

Run it the way the grader does (Node 22 or later, nothing to install —
standard library only):

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then identical to this directory's `POST.json`.

## Files

| File          | What it is                                            |
| ------------- | ----------------------------------------------------- |
| `main.ts`     | The program: delivers `POST.json` to the output dir   |
| `POST.json`   | The X post's address (placeholder until posted)       |
| `meme.png`    | The meme picture, 1024 × 1024                         |
| `meme.svg`    | The meme's editable vector source                     |
| `render.mjs`  | Rebuilds `meme.png` from `meme.svg`                   |
| `caption.txt` | The exact text of the X post                          |
| `LICENSE`     | MIT                                                   |

To rebuild the picture after editing the SVG:

```sh
node render.mjs
```

It uses `@resvg/resvg-js` when available and falls back to ffmpeg's SVG
reader; either way `meme.png` comes out at 1024 × 1024.
