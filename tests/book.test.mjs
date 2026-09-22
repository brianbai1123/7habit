import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { chapters, chapterGroups, GROUP_ORDER } from "../src/content/book.ts";

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
    assert.ok(chapter.plain.logic.length >= 4, chapter.slug);
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
  const labels = ["先理解", "找出核心观点", "重建逻辑", "用简单语言表达", "检查你是否能快速理解"];
  let cursor = 0;
  for (const label of labels) {
    const at = source.indexOf(label, cursor);
    assert.ok(at > cursor, label);
    cursor = at;
  }
});
