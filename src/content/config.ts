import { z, defineCollection } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updated:z.date().optional(),
    cover: z.string().optional(),
    categories: z.string().optional(),
    tags: z.string().optional(),
    draft: z.boolean().optional(),
  })
})

export const collections = {
  posts,
};