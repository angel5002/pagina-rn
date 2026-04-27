import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const weeks = defineCollection({
  loader: glob({ base: 'src/content/weeks', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      number: z.string(),
      order: z.number(),
      title: z.string(),
      topic: z.string(),
      date: z.string(),
      summary: z.string(),
      surface: z
        .enum(['peach', 'mint', 'yellow', 'mustard', 'canvas'])
        .default('canvas'),
      authors: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      cover: z
        .object({
          src: image(),
          alt: z.string().default(''),
          credit: z.string().optional()
        })
        .optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().default(''),
            caption: z.string().optional(),
            credit: z.string().optional()
          })
        )
        .optional()
    })
});

export const collections = { weeks };
