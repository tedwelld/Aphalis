# Image assets

## Logo

- `logo.png` — **brand logo** (the "Africa Jungle Safaris / Explore the Wild"
  badge). Used in the header and footer via `src/components/Logo.tsx`. Until this
  file is added, a text wordmark is shown instead. **Save the shared logo here.**

## Demo photography (`demo/`)

All catalog images (destinations, tours, activities, guides, gallery, blog, hero)
are **self-hosted** in `demo/` and served from our own domain — reliable and fast
on Vercel. They are curated Unsplash photos (Unsplash license) used as
placeholders.

How it works: each content item calls `demoPhoto(tags, lock)` and the `lock`
number is mapped to a file in `demo/` by `src/lib/img.ts`. To change an image,
either drop a replacement at the same `demo/<name>.jpg` path, or edit the
`lockImage` map in `src/lib/img.ts`.

> Note: these files must be **committed to git** so Vercel serves them.

Before launch, replace the `demo/` images with rights-cleared Africa Jungle
Safaris photography (keep the same filenames, or update `src/lib/img.ts`).
Recommended: landscape JPG/WebP, ~1600px wide for headers, ~800px for cards.
The gradient placeholder in `src/components/Photo.tsx` still covers any missing
or slow image so the layout never breaks.
