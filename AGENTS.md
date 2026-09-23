# AGENTS 个人 AI 展示站

## 目标

Will 的个人 AI 展示站：关于、AI 学习、作品集三块（D-018）。只记录个人层面的打工人 AI 应用，不放公司内部系统和内部落地项目（D-015）。站是 Will 自己带人来看的作品集，不做求职引导和联系转化（D-017）。

## 启动顺序

1. 先读 `README.md` 和 `docs/ROADMAP.md`。
2. 改视觉、动效或组件时，读 `docs/DESIGN_SYSTEM.md`。
3. 涉及定位、页面结构或发布口径时，读 `docs/DECISIONS.md`。
4. 文章时期的旧规范不在当前分支；追溯历史时看 Git 标签 `archive/practice-site-2026-09`，不作为当前规则。

## 内容边界

- 页面内容只来自 `site/data/`：`profile.ts`、`learning.yaml`、`works.yaml`；`repos.yaml` 只是仓库地址登记表，本身不渲染。
- 正式构建只收 `approved: true` 的条目；作品卡的「看仓库」链接另需 GitHub 仓库本身已公开（`visibility: public`）。新条目默认 `approved: false`，由 Will 审定后再改。
- 作品的「效果」字段可选，只写核实过的结果，没量过就留空，不写估计值。
- 不把客户、员工、合同、账号、密钥、本机路径、内部产品代号、内部治理记录带入公开稿。
- 联系方式只放 GitHub，不放邮箱和即时通讯账号。
- 作品截图只用虚构演示数据，并标注「演示数据」。
- 学习记录只写公开来源；「用在哪」只写已经发生的事，还没用上的标 `status: 在学`。
- 「客户成功」是 Will 的职位名，可以出现；其他「客户」字样不写。

## 工程边界

- Astro 静态站；没有明确需求时不增加后端、登录、数据库、评论或 AI 聊天。
- 新依赖必须说明用户价值、维护影响和更简单的替代方案；动效用原生 CSS 和 JavaScript。
- 本仓库为新的代码母源。Cloudflare 尚未连接新仓库；GitHub Pages 工作流仅允许手动触发，实际部署需明确授权。
- 不执行部署、域名、付费服务、仓库可见性或其他外部系统变更，除非 Will 明确确认。
- 不覆盖用户已有修改；不使用宽泛暂存或破坏性 Git 命令。

## 完成门禁

- 内容：文案经 Will 审定，`guard:content` 通过。
- 页面：桌面（1440）和移动端（375）可用，标签页可用键盘操作，支持 reduced motion，无占位正文。
- 工程：`npm run build` 与 `npm run build:github` 全部通过。
- 状态：同步更新 `README.md` 和 `docs/ROADMAP.md`；定位或结构变化写进 `docs/DECISIONS.md`。
