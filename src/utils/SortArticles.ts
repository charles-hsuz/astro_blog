import type { MarkdownInstance } from 'astro'
import type { CollectionEntry } from 'astro:content';

export function SortCollectArticles<T extends "posts">(List: CollectionEntry<T>[]): CollectionEntry<T>[] {
  return List.sort((a, b) => {
    return (
      // @ts-expect-error: Set limit key but still could not limit
      new Date(b.data.date).valueOf() -
      // @ts-expect-error: Set limit key but still could not limit
      new Date(a.data.date).valueOf()
    );
  });
}

