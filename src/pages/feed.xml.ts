import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

import { getCollection } from 'astro:content';

import type { APIContext } from 'astro';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Dylan Nolasco Blog',
    description: 'Some description',
    site: context.site?.toString() || "https://google.com",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body))
    }))
  });
}