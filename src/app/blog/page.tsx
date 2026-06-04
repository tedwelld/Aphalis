import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/cards";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Safari Journal",
  description: "Stories, guides and tips from the Indlulamithi Safaris & Tours team across Southern Africa.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Safari Journal"
        subtitle="Stories, tips and inspiration from the field."
        image="/images/nightsighting.jpeg"
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
