/**
 * Everything personal on the homepage, in one place.
 * Public-copy rule (D-015): no company, customer, colleague, internal product or local path names.
 * Contact is GitHub only. The copy says what Will does today and how the tools get built (D-018);
 * it does not name a role he is working towards.
 */

/** Illustration files live under public/images/; a missing file fails guard:links. */
type Illustration = `/images/${string}`;

interface FocusItem {
  title: string;
  text: string;
  state: '在做' | '接下来';
  /** Optional art for the focus card; until then the card shows a cream placeholder panel. */
  illustration?: Illustration;
}

const focus: FocusItem[] = [
  {
    title: '个人知识库',
    text: '资料留在本地，由 Agent 整理成能查、能复用的 wiki，而不是散在聊天记录和文件夹里。',
    state: '在做',
  },
  {
    title: '个人 AI 工具',
    text: '用 Vibe Coding 做自己每天要用的东西：看板、Skill、同步脚本。',
    state: '在做',
  },
  {
    title: '接通办公系统',
    text: '把 OA 这类日常系统接到命令行上，让 Agent 能直接查、直接办。',
    state: '接下来',
  },
];

export const profile = {
  name: 'Will',
  siteName: 'Will in Practice',
  // Top-left mark in the header. siteName stays the browser-tab and share-card name.
  brand: '熊 WILL',
  role: '客户成功 · 外贸 CRM SaaS · 把 AI 用进日常工作',
  headline: [{ text: '非技术背景' }, { text: '打工人' }, { text: '用 AI', highlight: true }],
  /** Optional art beside the headline. Public builds show nothing until it is set. */
  heroIllustration: undefined as Illustration | undefined,
  lede: '我是 Will，做客户成功。不是工程师出身，代码靠大模型辅助写出来，我负责想清楚要解决什么，再检查做出来的东西对不对。这里放学到的 AI 做法，和已经做成、自己每天在用的工具。',
  description:
    'Will 的个人 AI 学习和实践记录：学到的做法，以及用 AI 辅助做出来的个人知识库和小工具，写给想用 AI 把日常工作做轻一点的普通工作者。',
  github: {
    handle: 'willxiong92',
    url: 'https://github.com/willxiong92',
  },
  about: {
    intro: [
      '白天的工作是客户成功：帮外贸企业把 CRM 真正用起来。业务上的判断是本行，AI 是这两年补的新工具，所以一边学基本功，一边把学到的做法用进自己每天的活。',
      '不是工程师出身，代码主要由大模型辅助完成，我负责定清楚要解决什么、再逐段验收。之前的 AI 落地大多发生在公司内部，那部分不放在这里；这个站只记录个人层面的实践：一个普通工作者，怎么用 AI 把每天的活干得轻一点。',
    ],
    focus,
    principles: ['本地优先', '先找成熟方案，再写代码', '敏感信息不出本机'],
  },
} as const;
