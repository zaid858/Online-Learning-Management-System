import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Online-Learning-Management-System/',
  plugins: [react()],
  build: {
    outDir: '../docs',
  },
})