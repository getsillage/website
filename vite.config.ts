import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Organization GitHub Pages and custom domains use '/'. Subpath hosts can
// override VITE_BASE when building outside the canonical deployment.
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
