import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Health-Weight-Pro/' : '/',
  appType: 'spa',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
}));
