import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { withBase } from '../lib/paths';

export const GET: APIRoute = async () => {
  const base = import.meta.env.BASE_URL;
  const weeks = await getCollection('weeks');

  const entries = weeks
    .sort((a, b) => a.data.order - b.data.order)
    .map((w) => ({
      id: w.id,
      number: w.data.number,
      title: w.data.title,
      topic: w.data.topic,
      summary: w.data.summary,
      tags: w.data.tags ?? [],
      url: withBase(base, `semanas/${w.id}`)
    }));

  return new Response(JSON.stringify({ entries }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
};
