import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterView } from "@/components/chapter-view";
import { ReadingShell } from "@/components/reading-shell";
import { chapters, findChapter } from "@/content/book";

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters
    .filter((chapter) => chapter.slug !== "start")
    .map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = findChapter(slug);
  if (!chapter) {
    return { title: "没有这一站" };
  }
  return {
    title: chapter.title,
    description: chapter.lead,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = findChapter(slug);
  if (!chapter) {
    notFound();
  }
  return (
    <ReadingShell currentSlug={chapter.slug}>
      <ChapterView chapter={chapter} />
    </ReadingShell>
  );
}
