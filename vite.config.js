import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages: https://sejong-market.github.io/sejong_market_front/
// 환경 변수 DEPLOY_TARGET=gh-pages 일 때만 서브경로 base 적용,
// 그 외(로컬 dev, 다른 호스팅)는 루트(/)로 동작합니다.
const isGhPages = process.env.DEPLOY_TARGET === 'gh-pages'

export default defineConfig({
  base: isGhPages ? '/sejong_market_front/' : '/',
  plugins: [react(), tailwindcss()],
})
