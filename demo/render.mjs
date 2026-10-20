import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import path from "node:path";

const fps = 30;
const duration = 15;
const out = process.argv[2] ?? "media-search-demo.mp4";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto(pathToFileURL(path.resolve("demo/index.html")).href);

const ff = spawn("ffmpeg", ["-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", out], { stdio: ["pipe", "inherit", "inherit"] });

const frames = fps * duration;
for (let f = 0; f < frames; f++) {
  await page.evaluate(t => window.render(t), f / fps);
  const buf = await page.screenshot({ type: "png" });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
  if (f === 50 || f === 130 || f === 200 || f === 260 || f === 330 || f === 400) await page.screenshot({ path: `demo/frame-${f}.png` });
}
ff.stdin.end();
await new Promise(r => ff.on("close", r));
await browser.close();
