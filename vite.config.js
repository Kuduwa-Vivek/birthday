import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://<user>.github.io/birthday/
// Keep this matching the repo name, or set VITE_BASE when building.
const base = process.env.VITE_BASE || '/birthday/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
