import { defineCollection, reference, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * Homepage data lives in three hand-editable YAML files under site/data/.
 * Field shapes, URLs and repo references are enforced here during `astro check`;
 * scripts/check-content.mjs adds the sensitive-word scan a schema cannot express.
 *
 * `approved: false` entries render only in local preview (PUBLIC_CONTENT_PREVIEW=true),
 * so Will can review drafts without them reaching a public build.
 */

/**
 * Optional card art under public/images/. Without it the card keeps a cream placeholder panel.
 * guard:links fails the build if the file is missing.
 */
const illustration = z
  .string()
  .regex(/^\/images\/[\w./-]+\.(svg|png|jpe?g|webp|avif)$/, 'illustration must be an image path under /images/')
  .optional();

/**
 * Repo registry (D-018). Since the repo tab was merged into 作品集, a repo carries no public copy
 * of its own; a work card links to it. Visibility decides whether that link is rendered at all.
 */
const repos = defineCollection({
  loader: file('site/data/repos.yaml'),
  schema: z.object({
    title: z.string().min(1),
    url: z.string().url().startsWith('https://github.com/'),
    /** Whether the GitHub repo itself is public. Private repos are never linked. */
    visibility: z.enum(['public', 'private']),
  }),
});

const works = defineCollection({
  loader: file('site/data/works.yaml'),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    scenario: z.string().min(1),
    /** Optional and verified only: what the tool actually changed. Left out when nothing was measured. */
    result: z.string().min(1).optional(),
    tools: z.array(z.string().min(1)).min(1),
    /** Illustration or a screenshot built from demo data only. */
    illustration,
    repo_id: reference('repos').optional(),
    date: z.coerce.date(),
    status: z.enum(['在用', '维护中', '实验']),
    approved: z.boolean(),
  }),
});

const learning = defineCollection({
  loader: file('site/data/learning.yaml'),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    /** Where it ended up in Will's own work. */
    takeaway: z.string().min(1),
    /** The public site, course, repo, book or person it came from. */
    source: z.string().min(1),
    url: z.string().url().startsWith('https://').optional(),
    kind: z.string().min(1),
    date: z.coerce.date(),
    status: z.enum(['在学', '已用上']),
    illustration,
    approved: z.boolean(),
  }),
});

export const collections = { repos, works, learning };
