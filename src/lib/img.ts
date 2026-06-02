/**
 * Demo imagery helper.
 *
 * Uses loremFlickr (https://loremflickr.com) — free, keyword-based photos sourced
 * from Flickr's Creative Commons pool. The `lock` value makes each URL
 * deterministic (the same photo every time), so layouts are stable and there's
 * no flicker between renders.
 *
 * These are DEMO images only. Before launch, replace with rights-cleared ATSZ
 * photography by dropping files in /public/images and pointing the content
 * files back at local `/images/...` paths.
 */
export function demoPhoto(
  tags: string,
  lock: number,
  width = 1200,
  height = 800,
): string {
  // Tags are comma-separated and must NOT be URL-encoded (loremFlickr reads them
  // literally from the path).
  const cleanTags = tags.replace(/\s+/g, "");
  return `https://loremflickr.com/${width}/${height}/${cleanTags}?lock=${lock}`;
}
