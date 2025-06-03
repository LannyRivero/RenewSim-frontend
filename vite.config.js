// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';

export default defineConfig(() => {
  let httpsOptions = false;

  if (!process.env.CI) {
    httpsOptions = {
      key: fs.readFileSync('./cert/localhost-key.pem'),
      cert: fs.readFileSync('./cert/localhost.pem'),
    };
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5174,
      https: httpsOptions,
      proxy: {
        '/api': {
          target: 'http://renewsim-backend:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.js',
      include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}', 'test/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    },
  };
});


