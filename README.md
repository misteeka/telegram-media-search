# Telegram AI Media Search (concept demo)

Concept animation: search thousands of photos in a Telegram chat by describing them ("Semyon's dog"), like Apple Photos search.

Video: [media-search-demo.mp4](media-search-demo.mp4)

Built as a deterministic HTML timeline (`demo/index.html`) rendered frame by frame with Playwright and ffmpeg (`demo/render.mjs`), UI is rebuilt from the Telegram iOS UI Kit (Figma): glass buttons, wallpaper pattern, bubble tails, status bar, bezel and metrics are taken from it; layout matches provided Telegram screenshots. Icons for call/video/mute/search/more/QR are hand-drawn (SF Symbols are not exported by Figma); photos are placeholders. Run `node demo/build-assets.mjs` then `node demo/render.mjs`.

`npm i && npx playwright install chromium && node demo/render.mjs`


