import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

dotenv.config();

export default defineConfig({
  publicDir: 'resources/static',
  server: {
    port: process.env.VITE_PORT || 5173,
    cors: true,
    strictPort: true,
  },
  build: {
    assetsDir: '',
    emptyOutDir: true,
    manifest: true,
    outDir: `public_html/themes/${process.env.WP_DEFAULT_THEME}/assets`,
    rollupOptions: {
      input: {
        index: 'resources/js/index.js',
        editor: 'resources/js/editor.js',
      }
    },
  },
  plugins: [
    {
      name: 'php',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.php')) {
          server.ws.send({ type: 'full-reload', path: '*' });
        }
      },
    },
    tailwindcss(),
  ],
});
