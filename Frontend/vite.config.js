import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures correct asset paths
  server: {
    port: 3000, // Ensures Railway picks up the right port
  },
  build: {
    outDir: 'dist', // Ensures correct build output
  }
})
