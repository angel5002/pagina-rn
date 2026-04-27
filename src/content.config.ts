import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const weeks = defineCollection({
  loader: glob({ base: 'src/content/weeks', pattern: '**/*.md' }),
  schema: z.object({
    number: z.string(),
    order: z.number(),
    title: z.string(),
    topic: z.string(),
    date: z.string(),
    summary: z.string(),
    surface: z.enum(['peach', 'mint', 'yellow', 'mustard', 'canvas']).default('canvas'),
    authors: z.array(z.string()).default([])
  })
});

export const collections = { weeks };
