import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// For project-site GitHub Pages (org.github.io/website), set:
//   VITE_BASE=/website/
// Custom domains and apex sites should leave base as '/'.
const rawBase = process.env.VITE_BASE?.trim()
const base = !rawBase || rawBase === '/' ? '/' : rawBase.endsWith('/') ? rawBase : `${rawBase}/`

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
    sourcemap: false,
  },
})

