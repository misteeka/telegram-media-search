import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import path from "node:path";

const fps = 30;
const duration = 22;
const out = process.argv[2] ?? "media-search-demo.mp4";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
await page.goto(pathToFileURL(path.resolve("demo/index.html")).href);

const ff = spawn("ffmpeg", ["-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", out], { stdio: ["pipe", "inherit", "inherit"] });

const frames = fps * duration;
for (let f = 0; f < frames; f++) {
  await page.evaluate(t => window.render(t), f / fps);
  const buf = await page.screenshot({ type: "png" });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
  if ([20, 100, 150, 200, 300, 380, 430, 480, 540, 600, 640].includes(f)) await page.screenshot({ path: `demo/frame-${f}.png` });
}
ff.stdin.end();
await new Promise(r => ff.on("close", r));
await browser.close();



