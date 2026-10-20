# Telegram AI Media Search (concept demo)

Concept animation: search thousands of photos in a Telegram chat by describing them ("Semyon's dog"), like Apple Photos search.

Video: [media-search-demo.mp4](media-search-demo.mp4)

Built as a deterministic HTML timeline (`demo/index.html`) rendered frame by frame with Playwright and ffmpeg (`demo/render.mjs`), modeled on the spring-curve, shimmer-skeleton and shared-timeline approach of patsoooo/telegram-voice-transcription.

`npm i && npx playwright install chromium && node demo/render.mjs`
