# 决策记录

## D-001 网站定位（已被 D-015 取代）

- 决策：个人最佳实践发布站，专业知识工具属性约 70%，个人品牌属性约 30%。
- 原因：优先帮助访客完成真实任务，而不是展示文章数量。
- 影响：首页和内容页以任务、方法、模板和完成标准组织。

## D-002 内容所有权

- 决策：本地知识库是 canonical 母版，网站 `content/` 是公开派生层。
- 原因：避免两套正文独立演化。
- 影响：每篇发布稿必须保存 `source_id`、来源项目和复核日期。

## D-003 发布方式

- 决策：白名单单向发布，不自动遍历全部知识库。
- 原因：公开安全判断不能由“没有标 private”替代。
- 影响：首期效率略低，但泄露风险和错误同步风险显著降低。

## D-004 技术栈

- 决策：候选内容确认后使用 Astro + Markdown/MDX 构建静态站。
- 原因：内容型网站可保持较低运行复杂度和浏览器 JavaScript 体积。
- 影响：首期不引入登录、数据库和复杂服务端能力。
- 简化替代：若只验证阅读需求，可使用现成文档主题；当前保留 Astro 以支持更清晰的品牌和任务导航。

## D-005 开发启动门槛

- 决策：至少 3 篇真实公开稿通过门禁后，再创建网站程序。
- 原因：使用占位文案会让首页结构和视觉判断偏离真实内容。
- 影响：阶段 0 优先投入内容审核，减少后续返工。

## D-006 顶层类目

- 决策：公开站顶层主类目为 **AI · FDE · 外贸业务 · 国际站 · 独立站**。
- 原因：旧三分法里「外贸」过粗；国际站与独立站是不同工作流；FDE 是稳定对外名称，不改成「客户成功」。
- 影响：导航、领域页、`domain` 枚举与 `content/` 目录按五主类目组织；详细主线见 `docs/TAXONOMY.md`。

## D-007 FDE 命名

- 决策：对外与对内公开层均保留 **FDE**；「客户成功方法」只作为 FDE 域下的 L2 主线。
- 原因：与团队已有的 FDE 知识库命名一致，避免公开站与内部知识结构两套名称。
- 影响：顶栏、路径、schema 使用 `fde`；文案可解释 FDE 服务一体化经营与交付，但不改名。

## D-008 AI 主线 = 对客实践

- 决策：AI 域以 **对客实践** 为主线，不以模型评测或工具课目录为主线。
- 原因：既有 AI 知识库资产偏工具与接入，公开站需要按「能对客交付什么」重组；本地 Wiki 已有对客/外部助手与任务卡锚点。
- 影响：AI 领域页 L2 固定为：总方案 → 人机协同工作台 → 对客场景 Playbook → 任务分流 → 核验边界 →（次级）环境基线。工具教程编译进工作台，不单独主导导航。

## D-009 外贸三分

- 决策：将外贸拆为 **外贸业务 / 国际站 / 独立站** 三个主类目。
- 原因：三条工作流的指标、动作和母版来源不同；FDE-KB 也不把国际站细则并入 FDE。
- 影响：原 `trade` 内容按主题迁入 `trade_ops`、`global_platform` 或 `indie_site`。

## D-010 生产托管

- 决策：个人网站生产环境采用 **Cloudflare Pages** 静态托管，使用固定免费地址 `https://will-in-practice.pages.dev`；GitHub Pages 保留为回退入口。
- 原因：Quick Tunnel 依赖本机且 URL 会变，不适合对外传播；Pages 固定域名可关机访问、可对外传播。
- 影响：生产 `base` 为 `/`；默认 `PUBLIC_SITE_URL` / Astro `site` 为 `https://will-in-practice.pages.dev`（可被环境变量覆盖）。接 Git 后仍建议在 CF Production 环境变量写同一值。

## D-012 生产项目已落地

- 决策：Cloudflare Pages 项目名固定为 `will-in-practice`，生产域名 `https://will-in-practice.pages.dev`。
- 原因：首次部署已完成；代码与文档可写死真实 hostname，避免再回落 GitHub origin。
- 影响：`astro.config.mjs` 非 GitHub 构建默认 site 为 pages.dev；CLI 继续 Direct Upload，Git 自动部署需控制台连接仓库。

## D-011 生产内容门禁

- 决策：Cloudflare Pages 与 GitHub Pages 正式构建禁止 `PUBLIC_CONTENT_PREVIEW=true`，仅收录 `approved|published` 且 `public` 内容；构建流水线包含 content / dist / links 自动门禁。
- 原因：防止草稿与非公开内容泄漏到固定生产 URL。
- 影响：本地 `npm run dev` / `preview:build` 仍可预览草稿；线上 Preview 若看草稿必须另加 Access。

## D-013 实践稿写作结构与结构参考边界

- 决策：公开实践稿优先采用「场景与问题 → 核心判断 → 方法拆解 → 风险边界 → 行动工具」五段式，并强制知识关联与可交付行动工具；八宝周等图谱材料只作结构参考。
- 原因：提升任务完成率与可复用性，同时避免把第三方付费/公众号内容近义洗稿进公开站。
- 影响：作者模式须遵守 `docs/WRITING_GUIDE.md`；新稿默认 `maturity: draft` + `visibility: private` + `publication_status: review_required`，未经独立审核不得建议公开。

## D-014 公开发布站与受控协作入口分离（已被 D-015 取代）

- 决策：公开首页、领域页、实践库与全部 `approved + public` 正文继续免登录访问；仅 `/team/` 与 `/admin/` 使用 Cloudflare Pages Advanced Mode 做服务端权限控制。
- 原因：个人 FDE 网站需要公开传播和搜索收录；团队协作入口又需要明确身份边界。整站加密会削弱公开价值，前端隐藏则不能形成真实权限。
- 影响：新增团队共享口令、管理员独立账号和 12 小时签名会话；GitHub Pages 回退站不具备权限能力，因此受控页面只允许放公开安全内容。
- 边界：登录不能让 `team`、`private`、`review_required` 内容进入正式构建；客户数据、公司内部规则和本机路径仍不得进入生产包。
- 简化替代：如果未来不再需要团队协作，可移除 `_worker.js` 与受控页面，公开内容架构不受影响。

## D-015 改版为个人 AI 展示站（2026-09-11）

- 决策：网站定位改为「个人介绍 · AI 实践（公开 Git 仓库）· AI 作品集（Vibe Coding）」单页站，方向是打工人 AI 应用：个人知识库、个人 AI 工具、接通办公系统。视觉参考 oiloil.org：白底、奶油黄高亮、超大紧排标题、板块标签页。
- 取代：D-001（知识工具定位）、D-014（团队与管理员受控入口）。D-005 至 D-009、D-013 随文章下线不再适用；D-002、D-003、D-011 的「白名单单向发布、正式构建有门禁」原则保留，口径改为数据文件里的 `approved` 字段。
- 原因：工作中的 AI 落地不适合放在个人站；访客需要看到做成的工具和仓库，而不是方法文章合集。团队入口已不再使用，保留只会增加维护面和泄露面。
- 删除范围（已在本地分支 `redesign/showcase` 执行，全部可从 Git 标签 `archive/practice-site-2026-09` 找回）：
  - 文章：`content/`（78 篇）、`content-registry.yaml`、`site/pages/{library,search,about}.astro`、`site/pages/{practice,ai,fde,trade-ops,global-platform,indie-site}/`、`site/components/{DomainShell,PracticeCard,ShelfCard}.astro`、`site/lib/content.ts`、`public/images/hero-workbench.png`
  - 团队入口：`site/pages/{team,admin,access}/`、`site/styles/access.css`、`public/{_worker.js,access.js,admin-access.js,protected-session.js}`、`scripts/test-access-worker.mjs`、`npm run test:access`
  - 旧规范文档（9 个文件）：`docs/CONTENT_POLICY.md`、`docs/TAXONOMY.md`、`docs/WRITING_GUIDE.md`、`docs/ACCESS_ARCHITECTURE.md`、`docs/reviews/` 下 5 篇批次评审。先移到 `docs/archive/`，因其中含内部类目和内部名称，随后整体删除。
- 批准：
  - Will，2026-09-11，对话中两轮拍板后审批改版计划（文章整体下线；团队入口连同登录逻辑整体移除；联系方式只放 GitHub；作品集只放个人 AI 工具）。删除在批准之后执行。
  - Will，2026-09-11，对改版汇报的 4 个问题回复「按照你的建议修改」：删除上面 9 个旧规范文档；D-007、D-008、D-014 里的内部名称改成泛称；Agent Dashboard 仓库不公开；知识库模板清理后另建干净仓库。
  - Will，2026-09-11，先回复「然后 QA 帮我执行」，随后更正为「不是QA, 是Q1」，即批准 Q1：用清理后的干净快照新建公开仓库 `willxiong92/ai-wiki-kb-template` 并推送 `main`。当天已执行。
- 影响：
  - 页面内容全部在 `site/data/`（`profile.ts`、`repos.yaml`、`works.yaml`、`learning.yaml`），加条目不改页面代码。
  - 2026-09-11 补充：Will 在本地预览上标注，加「AI 学习」板块（`learning.yaml`），记录从哪学的、用在了自己工作的哪里，同样只发布 `approved: true` 的条目。左上角署名改为「熊 WILL」，浏览器标题和分享卡片仍叫 Will in Practice。
  - Agent Dashboard 的代码和测试含工作内部术语，此前也定过插件代码只放私有仓库，所以只做作品卡，不出仓库卡、不放「看仓库」链接。
  - 正式构建只收 `approved: true` 的条目，仓库卡片另需 `visibility: public`；没有条目的标签页不出现。
  - 联系方式只有 GitHub，失效的邮箱地址已全站移除。
  - Cloudflare 生产站回到纯静态模式，旧的团队口令和管理员 Secret 失效，可在控制台清理（见 `docs/CLOUDFLARE_PAGES.md`）。
  - 旧文章链接统一落到 404 页。旧代码仍在公开仓库的 Git 历史里，这次不改写历史。
- 简化替代：只用 GitHub 个人主页的 README 也能列仓库，但做不出作品集和统一视觉；保留 Astro 是因为双站部署和构建门禁已经跑通，改动成本最低。

## D-016 首页卡片按 oiloil.org 的内容界面重排，并预留插图位（2026-09-11）

- 决策：板块标签页改用荧光笔条标记选中；四个面板各用一种卡片：关于是介绍加「方向」横向卡，AI 学习是文章卡，AI 实践是大标题仓库卡，作品集是插图和文字左右交替的宽卡。首屏和每张卡都预留插图位，由共用组件 `site/components/home/Illo.astro` 渲染。
- 原因：Will 要求「参考他的内容UI界面，先把布局完善后，后续补充插图和内容」。先把卡片比例定下来，插图和文案后补时不用再改布局。
- 数据结构变化：
  - `learning.yaml`、`repos.yaml`、`works.yaml` 新增可选字段 `illustration`（`/images/` 下的图片路径）；`works.yaml` 原有但从未使用的 `cover` 字段并入 `illustration`。
  - `site/data/profile.ts` 新增可选的 `heroIllustration` 和 `about.focus[].illustration`。
  - `guard:links` 同时检查 `src`，插图文件缺失会拦下构建。
- 边界：没有插图时，正式构建显示奶油色点阵底板，不出现「插图位」字样；首屏没有图时正式构建不渲染插图位。插图是装饰（`alt=""`），不承载必须读到的信息。作品插图若用截图，仍只用虚构演示数据。各插图位的比例和显示尺寸见 `docs/DESIGN_SYSTEM.md`。
- 批准：Will，2026-09-11，对话中提出上面的要求。本条是已定架构内的可逆布局与字段调整，不改技术栈、部署和发布规则。
- 简化替代：保留原来的统一卡片，只在顶部加一张封面图，改动更小；但四个板块会长得一样，和参考站差距大。

## D-017 网站用途：由 Will 直接分享的作品集（2026-09-11）

- 决策：网站是 Will 在合适场合直接分享给对方看的作品集，同时记录自己学 AI、用 AI 的进展。网站不承担联系转化，不加联系表单、私信渠道或合作入口。个人发展方向、能力差距和学习计划只在私下维护，不做成公开板块。
- 原因：访客主要由 Will 本人带来，展示时可以当面讲解，站内不需要引导陌生访客联系。公开写计划和差距等于公开承诺，没做到反而减分。
- 影响：
  - 联系方式维持 D-015 的「只有 GitHub」。
  - 不做公开的能力地图、更新计划或英文版。
  - 文案如实写非技术背景：代码由大模型辅助完成，不写成已经具备工程能力。
- 批准：Will，2026-09-11，对话中说明给出的方向「不代表我需要在网站上直接体现这些内容」，合适的机会会直接把网站展示给对方看，不需要别人通过网站直接联系。

## D-018 合并成三个标签，身份口径去掉 FDE（2026-09-12）

- 决策：
  - 「AI 实践」并入「作品集」，标签页只剩关于 `#about`、AI 学习 `#learning`、作品集 `#works` 三个。
  - `repos.yaml` 降为仓库地址登记表，只留 `title`、`url`、`visibility`，不再有自己的文案和卡片；作品卡通过 `repo_id` 找到仓库，仓库公开时整张卡片就是仓库链接。`RepoCard.astro` 删除。
  - `works.yaml` 新增可选字段 `result`（卡片上叫「效果」），只写核实过的结果；没量过就不写，不放估计值。
  - 身份口径去掉 FDE：`profile.role` 改成「客户成功 · 外贸 CRM SaaS · 把 AI 用进日常工作」，自我介绍如实写代码由大模型辅助完成、自己负责想清楚要解决什么并逐段验收。分享图的同一行也去掉 FDE。
- 原因：Will 说明自己没有技术背景，按国外 FDE 对代码能力的要求「其实有点达不到」，核心是先把行业 know-how 和 AI 基础学起来。写一个还没达到的头衔，等于给自己立一个当面讲解时撑不住的承诺。另一方面，「AI 实践」和「作品集」在访客眼里是同一件事：两个标签放同一批东西，还让手机上第四个标签落到屏幕外。
- 一并修的前端一致性问题（都在 `site/styles/global.css`）：
  - `--t3` 从 `#999` 提到 `#767676`，白底对比度从 2.85:1 提到 4.54:1，覆盖 46 处元信息。
  - 字号收成 `--fs-xs/sm/md/lg` 四档加 `--fs-num`，卡片内边距收成 `--card-pad`，卡片内插图圆角收成 `--radius-inner`，原来散落的 15 种字号、4 种内边距、3 种圆角不再各写各的。
  - 悬停上浮改成只对 `.card.is-link` 生效，不可点的卡片不再假装可点。
  - 站外链接统一 ↗，站内统一 →。
  - 760px 以下标签栏吸顶（纯 CSS），手机上单个面板近 1900px 高时不会把标签滚丢。
  - 分享图改成 PNG（`public/images/og-default.png`，1200 × 630，由同目录的 SVG 导出），SVG 分享卡在多数平台不显示。
- 边界：不加求职引导、能力地图和联系入口（D-017 不变）。AI 学习的条目由 Will 自己提供，不代写。作品的「效果」缺省就是没有这一行。
- 批准：Will，2026-09-12，弹窗四题分别选「合并成三个标签」「去掉 FDE，写在做什么」「加，只写核实过的」，开工范围选了前端修复、按上面的选择改结构和文案、从本机工具里挑作品候选、弹窗规则写进全局配置。
- 简化替代：四个标签保留、只改文案，改动更小；但两个标签的内容边界说不清楚，访客要在两处看同一批工具。

## 2026-09-21 · GPT Sites 托管

Will 请求将当前个人网站部署到 GPT Sites，并确认全部预览文案（2 条学习记录、6 个作品）。本次使用现有 Astro 静态构建，新增 GPT Sites 托管入口，按新建站点默认访问范围仅本人可见。代码与内容母源仍在原项目；Cloudflare/GitHub 生产站本次不发布，未更改其现有配置。

## 2026-09-23 · 新仓库替代旧项目

Will 确认创建公开仓库 `will-in-practice-site`，核验上传后永久删除旧 GitHub 仓库。以当前个人展示站为唯一维护版本；保留旧本地代码与现有托管站点。此次仅迁移代码，不重新部署网站。

## 2026-09-25 · 旧 pages.dev 改为跳转，默认站点地址改为 GPT Sites

- 背景：个人站 2026-09-25 起在 GPT Sites 对所有人可见。旧的 `will-in-practice.pages.dev` 还在展示旧版文章站，两个版本同时在线。Astro 默认 `site` 也还指向 pages.dev，公开站的 canonical 和 sitemap 因此写的是旧地址。
- 决策：pages.dev 只做跳转。生产部署换成一个只有 `_redirects` 和兜底 `index.html` 的版本，所有路径 302 到 GPT Sites 首页。用 302 不用 301，是为了保留回滚余地：301 会被浏览器长期缓存。`astro.config.mjs` 的默认地址改为 GPT Sites，「本站」作品卡的托管说明同步改掉。
- 批准：Will，2026-09-25，弹窗选「跳转到新站」和「现在改代码，下次发文时一起上线」。
- 状态：跳转已部署并核验（先在预览分支 `redirect-check` 验证，再部署生产 `main`）。代码改动只在本地构建通过，没有提交，也没有发布到 GPT Sites，等下次发文时一起上线。
- 简化替代：直接删除 CF 项目最省事，但不可逆，旧链接会直接打不开。
