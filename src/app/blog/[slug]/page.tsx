import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/CtaBand";
import { blogPosts, getPost } from "@/content/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader title={post.title} image={post.image} />
      <Section>
        <article className="mx-auto max-w-2xl">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark">
            <ArrowLeft className="h-4 w-4" /> Back to journal
          </Link>
          <p className="mt-6 text-sm uppercase tracking-wider text-gold-dark">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            {" · "}
            {post.author}
          </p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
            {post.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>
      </Section>
      <CtaBand />
    </>
  );
}
