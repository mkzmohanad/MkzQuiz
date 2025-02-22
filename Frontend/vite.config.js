import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures correct asset paths
  server: {
    port: 3000, // Uses Railway's port dynamically
  },
  build: {
    outDir: 'dist', 
    minify: 'esbuild', // Faster & less memory usage than 'terser'
    target: 'esnext', // Prevents unnecessary polyfills
    chunkSizeWarningLimit: 1500, // Avoids chunk splitting warnings
    rollupOptions: {
      output: {
        manualChunks: undefined, // Reduces chunk fragmentation
      },
    },
  }
});
