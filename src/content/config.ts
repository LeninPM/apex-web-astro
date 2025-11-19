// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 1. Definimos la colección 'blog'
const blogCollection = defineCollection({
  type: 'content', // significa que usaremos Markdown o MDX
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // 'transform' convierte el string de fecha en un objeto Date
    pubDate: z.string().transform((str) => new Date(str)),
    heroImage: z.string().optional(), // una imagen opcional
  }),
});

// 2. Exportamos la colección
export const collections = {
  'blog': blogCollection,
};