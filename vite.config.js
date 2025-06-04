import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Meowbucks Coffee - Your Favorite Coffee Shop',
      short_name: 'Meowbucks',
      description: 'Order your favorite coffee drinks and food from Meowbucks. A Progressive Web App for coffee lovers!',
      theme_color: '#006241',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait-primary',
      scope: '/',
      start_url: '/?source=pwa',
      id: 'meowbucks-coffee-app',
      categories: ['food', 'lifestyle', 'shopping'],
      icons: [
        {
          src: '/logo.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any'
        },
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      screenshots: [
        {
          src: '/screenshots/mobile-home.png',
          sizes: '390x844',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'Home screen showing featured drinks and menu'
        },
        {
          src: '/screenshots/mobile-menu.png',
          sizes: '390x844',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'Menu screen with drink categories'
        },
        {
          src: '/screenshots/desktop-home.png',
          sizes: '1280x720',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Desktop home screen'
        },
        {
          src: '/screenshots/desktop-menu.png',
          sizes: '1280x720',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Desktop menu screen'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,ttf,woff,woff2}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/globalassets\.starbucks\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'starbucks-images',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
          }
        }
      ]
    },

    devOptions: {
      enabled: true, // Enable for development testing
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  server: {
    allowedHosts: true,
  }
})
