# Telegram AI Media Search (concept demo)

Concept animation: search thousands of photos in a Telegram chat by describing them ("Semyon's dog"), like Apple Photos search.

Video: [media-search-demo.mp4](media-search-demo.mp4)

Built as a deterministic HTML timeline (`demo/index.html`) rendered frame by frame with Playwright and ffmpeg (`demo/render.mjs`), modeled on the spring-curve (Telegram-iOS `makeSpringAnimation` bezier 0.23,1,0.32,1), shimmer-skeleton and shared-timeline approach of patsoooo/telegram-voice-transcription. Colors (accent #0088ff, white incoming and #e1ffc7 outgoing bubbles, glass nav pills) come from Telegram-iOS `DefaultDayPresentationTheme.swift`.

`npm i && npx playwright install chromium && node demo/render.mjs`

