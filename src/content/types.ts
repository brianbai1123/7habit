export type DiagramId =
  | "whole"
  | "paradigm"
  | "see-do-get"
  | "habit-def"
  | "maturity"
  | "ppc"
  | "circles"
  | "matrix"
  | "centers"
  | "bank"
  | "listen"
  | "synergy"
  | "saw";

export type EssenceBlock = {
  heading: string;
  paragraphs: string[];
  points?: string[];
  diagram?: DiagramId;
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
};

export type Chapter = {
  slug: string;
  group: "读之前" | "原书的地基" | "个人的胜利" | "公众的胜利" | "更新与收束";
  navLabel: string;
  eyebrow: string;
  title: string;
  bookRef: string;
  lead: string;
  habit?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  place?: string;
  essenceIntro: string;
  essence: EssenceBlock[];
  plain: {
    understand: string;
    core: string;
    logic: string[];
    scenes: { title: string; body: string }[];
    checks: { question: string; answer: string }[];
  };
  remember: string;
  glossary?: { term: string; def: string }[];
};

export const GROUP_ORDER = [
  "读之前",
  "原书的地基",
  "个人的胜利",
  "公众的胜利",
  "更新与收束",
] as const;
