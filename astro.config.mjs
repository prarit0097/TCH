import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://thecircadianhospital.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: { server: { proxy: { '/api': 'http://127.0.0.1:8000' } } },
});
