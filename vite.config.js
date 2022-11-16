import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      base: '/',
      registerType: 'autoUpdate',
      manifest: {
        name: 'TRADELAL',
        short_name: 'TRADELAL',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
      },
    })
  ]
})
