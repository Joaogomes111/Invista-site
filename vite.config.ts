import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    optimizeDeps: { exclude: ['lucide-react'] },
    plugins: [vinext()],
  };
});
