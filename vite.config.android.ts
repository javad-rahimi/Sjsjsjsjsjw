import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

/**
 * Build config for Sketchware / Android WebView (file:///android_asset/...).
 * - No PWA / service worker (not supported on file://).
 * - Single classic (non-module) script: <script type="module"> is blocked by CORS on file://.
 * - Fonts and images are inlined as data URIs, so no extra files are needed.
 * After `vite build`, scripts/make-android-bundle.mjs inlines JS + CSS into one index.html.
 */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, '.') },
  },
  build: {
    outDir: 'dist-android',
    emptyOutDir: true,
    target: 'es2020',
    modulePreload: false,
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 20_000,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
});
