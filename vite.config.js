// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: `/Front-end-Seer/`,
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', 
  },
});
