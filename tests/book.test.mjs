import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { chapters, chapterGroups, GROUP_ORDER } from "../src/content/book.ts";
import {
  resolveTheme,
  THEME_BOOTSTRAP_SCRIPT,
  THEME_KEY,
} from "../src/lib/theme.ts";

const HABITS = [
  "积极主动",
  "以终为始",
  "要事第一",
  "双赢思维",
  "知彼解己",
  "统合综效",
  "不断更新",
];

test("stations follow the book, then a closing synthesis", () => {
  assert.deepEqual(
    chapters.map((chapter) => chapter.slug),
    [
      "start",
      "foundation",
      "path",
      "habit-1",
      "habit-2",
      "habit-3",
      "habit-4",
      "habit-5",
      "habit-6",
      "habit-7",
      "together",
    ],
  );
});

test("every station has both layers and the five-step reread", () => {
  for (const chapter of chapters) {
    assert.ok(chapter.lead.length > 40, chapter.slug);
    assert.ok(chapter.essenceIntro.length > 20, chapter.slug);
    assert.ok(chapter.essence.length >= 4, chapter.slug);
    assert.ok(chapter.bookRef.length > 0, chapter.slug);
    assert.equal(chapter.plain.checks.length, 3, chapter.slug);
    assert.equal(chapter.plain.logic, undefined, chapter.slug);
    const { chain, breaks } = chapter.plain;
    assert.ok(chain.length >= 7, chapter.slug);
    assert.equal(chain[0].via, undefined, chapter.slug);
    for (const link of chain.slice(1)) {
      assert.ok(link.via, `${chapter.slug} ${link.claim}`);
      assert.ok(!link.claim.startsWith(link.via), `${chapter.slug} repeats via: ${link.claim}`);
    }
    for (const link of chain) assert.ok(link.detail.length >= 20, `${chapter.slug} ${link.claim}`);
    assert.ok(chain.at(-1).claim.startsWith("结果"), chapter.slug);
    assert.ok(breaks.length >= 2, chapter.slug);
    assert.ok(chapter.plain.scenes.length >= 2, chapter.slug);
    assert.equal((chapter.plain.core.match(/。/g) || []).length, 1, chapter.slug);
    for (const block of chapter.essence) {
      assert.ok(block.paragraphs.length >= 1, block.heading);
      assert.ok(block.paragraphs.every((paragraph) => paragraph.length > 20));
    }
    for (const check of chapter.plain.checks) {
      assert.ok(check.question.endsWith("？") || check.question.endsWith("吗？"), check.question);
      assert.ok(check.answer.length > 20, check.question);
    }
  }
});

test("seven habits keep the book's names and private-before-public order", () => {
  const habits = chapters.filter((chapter) => chapter.habit);
  assert.deepEqual(
    habits.map((chapter) => chapter.title),
    HABITS,
  );
  assert.deepEqual(
    habits.map((chapter) => chapter.habit),
    [1, 2, 3, 4, 5, 6, 7],
  );
  assert.deepEqual(
    habits.slice(0, 3).map((chapter) => chapter.group),
    ["个人的胜利", "个人的胜利", "个人的胜利"],
  );
  assert.deepEqual(
    habits.slice(3, 6).map((chapter) => chapter.group),
    ["公众的胜利", "公众的胜利", "公众的胜利"],
  );
});

test("navigation groups cover every station once", () => {
  const grouped = chapterGroups().flatMap((group) => group.chapters.map((chapter) => chapter.slug));
  assert.deepEqual(grouped, chapters.map((chapter) => chapter.slug));
  assert.deepEqual(
    chapterGroups().map((group) => group.label),
    [...GROUP_ORDER],
  );
});

test("the page shows the five-step method in order", () => {
  const source = readFileSync(new URL("../src/components/chapter-view.tsx", import.meta.url), "utf8");
  const labels = ["先理解", "找出核心观点", "逻辑因果链", "用简单语言表达", "检查你是否能快速理解"];
  let cursor = 0;
  for (const label of labels) {
    const at = source.indexOf(label, cursor);
    assert.ok(at > cursor, label);
    cursor = at;
  }
});

test("theme resolution gives a valid query priority over stored state", () => {
  assert.equal(resolveTheme("night", "paper"), "night");
});

test("theme resolution uses valid stored state without a query", () => {
  assert.equal(resolveTheme(null, "celadon"), "celadon");
});

test("theme resolution falls back from an invalid query to valid stored state", () => {
  assert.equal(resolveTheme("invalid", "night"), "night");
});

test("theme resolution defaults to paper when no candidate is valid", () => {
  assert.equal(resolveTheme(null, "invalid"), "paper");
});

test("theme state is independent from the principles reader", () => {
  assert.equal(THEME_KEY, "7habit:theme");
  assert.ok(!THEME_BOOTSTRAP_SCRIPT.includes("principles:theme"));
});

test("layout runs the theme bootstrap inline before the body hydrates", () => {
  const source = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
  const script = source.indexOf(
    '<script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />',
  );
  const body = source.indexOf("<body");

  assert.match(source, /<html[^>]*suppressHydrationWarning/);
  assert.ok(script !== -1, "layout must contain the inline theme bootstrap");
  assert.ok(script < body, "theme bootstrap must run before the body");
});

test("reading room matches the home typography and theme contract", () => {
  const layout = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
  const shell = readFileSync(
    new URL("../src/components/reading-shell.tsx", import.meta.url),
    "utf8",
  );
  const chapter = readFileSync(
    new URL("../src/components/chapter-view.tsx", import.meta.url),
    "utf8",
  );

  assert.match(layout, /Cormorant_Garamond/);
  assert.match(layout, /lxgw-wenkai-screen-web/);
  assert.match(css, /data-theme="celadon"/);
  assert.match(css, /data-theme="night"/);
  assert.match(css, /\.font-kai/);
  assert.match(css, /\.font-num/);
  assert.match(shell, /ThemeSwitcher/);
  assert.match(chapter, /font-num/);
});
