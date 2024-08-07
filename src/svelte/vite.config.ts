import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const file = fileURLToPath(import.meta.url);
const dir = path.dirname(file).replace(/\\+/, '/');

console.log(path.resolve(dir, './src/lib/components'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      name: 'KonstaSvelte',
      fileName: 'konsta-svelte',
      entry: 'src/index.ts',
    },
    minify: false,
    outDir: './dist',
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      $components: path.resolve(dir, './src/lib/components'),
      $icons: path.resolve(dir, './src/lib/components/icons'),
      $shared: path.resolve(dir, './src/lib/shared'),
      $konsta: path.resolve(dir, '../shared'),
    },
  },
  //base: "",
});
