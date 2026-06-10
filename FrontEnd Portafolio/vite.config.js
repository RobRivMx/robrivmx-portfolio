import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/robrivmx-portfolio/', // <-- Esta es la línea maestra para GitHub Pages
});
