import { getCollection, type CollectionEntry } from 'astro:content';

/** Local preview (`npm run dev`, `preview:*`) shows drafts; production builds never do. */
export const isPreview = import.meta.env.PUBLIC_CONTENT_PREVIEW === 'true';

export type Repo = CollectionEntry<'repos'>;
export type Work = CollectionEntry<'works'>;
export type Learning = CollectionEntry<'learning'>;

const newestFirst = <T>(pick: (item: T) => Date) => (a: T, b: T) => pick(b).getTime() - pick(a).getTime();

/**
 * The repo registry itself renders nothing (D-018): a work card looks its repo up here and links
 * out only when the GitHub repo is public, so no filtering happens at this level.
 */
export async function getRepos(): Promise<Repo[]> {
  return getCollection('repos');
}

export async function getWorks(): Promise<Work[]> {
  const works = await getCollection('works');
  return works
    .filter((work) => isPreview || work.data.approved)
    .sort(newestFirst((work) => work.data.date));
}

export async function getLearning(): Promise<Learning[]> {
  const learning = await getCollection('learning');
  return learning
    .filter((item) => isPreview || item.data.approved)
    .sort(newestFirst((item) => item.data.date));
}

export function formatMonth(date: Date) {
  return `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function formatDay(date: Date) {
  return `${formatMonth(date)}.${String(date.getUTCDate()).padStart(2, '0')}`;
}
