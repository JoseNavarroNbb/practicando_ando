import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/js/app.js',
        'resources/scss/app.scss'
      ],
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
      '~': path.resolve(__dirname, './resources'),
      '~scss': path.resolve(__dirname, './resources/scss'),
      '~temas': path.resolve(__dirname, './resources/js/components/Temas'), // Nuevo alias
      vue: 'vue/dist/vue.esm-bundler.js'
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~scss/variables" as *;`
      }
    }
  },
  optimizeDeps: {
    include: [
      // Lista de componentes para precargar en desarrollo
      '@/components/Temas/Bucles/For.vue',
      '@/components/Temas/Bucles/While.vue'
    ]
  }
});