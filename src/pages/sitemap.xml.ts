import type { APIRoute } from 'astro';
import { pages, articles, hospital } from '../data/site';
export const GET: APIRoute = () => {
  const routes = ['', 'contact', 'journal', ...pages.map(page => page.slug), ...articles.map(page => page.slug)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${hospital.domain}/${route ? route + '/' : ''}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
