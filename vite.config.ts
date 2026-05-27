import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

// Always use the real project folder (not a stray "#" subfolder from a bad dev command).
export default defineConfig({
  root: projectRoot,
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
})
