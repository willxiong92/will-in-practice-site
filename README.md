# Will in Practice

个人 AI 展示站：关于、AI 学习、作品集。当前正式维护仓库为 https://github.com/willxiong92/will-in-practice-site 。

## 内容与运行

页面内容在 `site/data/`：个人介绍 `profile.ts`、2 条学习记录 `learning.yaml`、6 个作品 `works.yaml`、仓库链接 `repos.yaml`。当前文案已由 Will 于 2026-09-21 审定。

```sh
npm ci
npm run dev
npm run build
npm run build:github
```

技术栈为 Astro 静态站。`site/components/` 放组件，`site/pages/` 放页面，`public/` 放静态资源，`scripts/` 放内容、产物和链接检查。正式构建只收 `approved: true` 的条目。

## 托管状态

- GPT Sites：https://will-in-practice.willxiong92.chatgpt.site ，现有部署保留；`.openai/hosting.json` 记录站点身份。本次代码迁移未重新部署 Sites，线上源码链接仍需下次部署更新。
- Cloudflare：https://will-in-practice.pages.dev ，现有站点保留，新仓库尚未接入自动部署。
- GitHub Pages：新仓库尚未启用；兼容构建路径为 `/will-in-practice-site/`，工作流仅手动触发。

本仓库从已确认的新网站版本建立干净快照，不包含旧项目历史。旧 GitHub 仓库与旧本地项目均已于 2026-09-24 前删除，本仓库是唯一版本。后续只在此仓库维护；旧 GitHub 仓库删除授权与执行状态见 `docs/ROADMAP.md`。
