import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { destinations } from "@/content/destinations";
import { tours } from "@/content/tours";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/about",
    "/destinations",
    "/activities",
    "/tours",
    "/gallery",
    "/blog",
    "/contact",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  const dynamicRoutes = [
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...tours.map((t) => `/tours/${t.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  return [...staticRoutes, ...dynamicRoutes];
}
