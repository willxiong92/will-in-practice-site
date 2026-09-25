# Cloudflare Pages

2026-09-25 起，https://will-in-practice.pages.dev 只做跳转：生产部署（`main`，部署 ID `81b56369`）只包含 `_redirects` 和兜底 `index.html`，所有路径 302 到 https://will-in-practice.willxiong92.chatgpt.site/ 。

2026-09-25 实测：CF 项目 `will-in-practice` 显示仍连着 Git，但连的是已删除的旧仓库。新仓库 `willxiong92/will-in-practice-site` 里没有它最近部署过的提交（`cc0d196`、`ab9745d`），所以这条自动部署实际上已经失效。以后不要重新连接新仓库，否则会把跳转覆盖掉。

回滚：Cloudflare 控制台 › Workers & Pages › `will-in-practice` › Deployments，找到 `main` 分支上一版（提交 `ab9745d`）› 右侧「⋯」› Rollback to this deployment。

原有账号配置、Secrets 和 KV 均未清理。
