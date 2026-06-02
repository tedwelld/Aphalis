# Image assets

Drop Africa Jungle Safaris photography here. Until a file exists, the site shows a
tasteful gold/cream gradient placeholder (see `src/components/Photo.tsx`), so
the layout never breaks.

Expected paths (referenced from content + components):

- `logo.png` — **brand logo** (the "Africa Jungle Safaris / Explore the Wild"
  badge). Used in the header and footer via `src/components/Logo.tsx`. Until this
  file is added, a text wordmark is shown instead. Save the shared logo here.
- `hero.jpg` — homepage hero background
- `page-header.jpg` — default inner-page banner
- `about.jpg` — about page story image
- `destinations/zimbabwe.jpg`, `botswana.jpg`, `namibia.jpg`, `zambia.jpg`
- `tours/<tour-slug>.jpg` — one per tour (see `src/content/tours.ts`)
- `guides/guide-1.jpg`, `guide-2.jpg`, `guide-3.jpg`
- `gallery/*.jpg` — see `src/content/site.ts`
- `blog/<post-slug>.jpg` — see `src/content/blog.ts`

Recommended: landscape JP/WebP, ~1600px wide for headers, ~800px for cards.
Replace placeholder names with real, rights-cleared Africa Jungle Safaris imagery
before launch.
