import { defineConfig } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),

  ],
  server: {
    proxy: {
      '/api': {  // 🔹 Redirige todas las peticiones con /api al backend
        target: 'http://localhost:8080', // Cambia esto a la URL de tu backend
        changeOrigin: true,
        secure: false, // Si el backend usa HTTPS en desarrollo, cámbialo a true
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina "/api" en la solicitud
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
