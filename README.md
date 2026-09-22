# 七个习惯

《高效能人士的七个习惯》的独立导读。在线阅读：

**https://brianbai1123.github.io/7habit/**

它按史蒂芬·柯维原书的顺序来讲：先是由内而外和成熟模式，然后是个人领域的成功（习惯一到三）、公众领域的成功（习惯四到六），最后是不断更新。每一站都读两遍。

1. **原书在讲什么**：跟着该章自己的论证，把模型讲清楚。
2. **用简单的话再讲一遍**：先理解，找出核心观点，重建逻辑，用初中生活里的语言表达，再用三个问题检查能不能自己讲出来。

文中的林可是为了把道理放进校园而写的人物，不是原书人物。本站是独立导读，不替代原书，也与 FranklinCovey 没有隶属关系。

## 本地预览

```bash
npm install
npm run dev
```

打开 http://127.0.0.1:43141 。

本地模拟 GitHub Pages 子路径：

```bash
npm run build:gh
npx serve out
```

## 检查

```bash
npm test
npm run lint
npm run build
```

## 部署

推送到 `main` 后，GitHub Actions 会静态导出并发布到 Pages。仓库的 Pages 源是 **GitHub Actions**。

## 技术栈

Next.js 16（`output: 'export'`）+ React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui 的按钮。无后端、无数据库。正文在 `src/content/`。
