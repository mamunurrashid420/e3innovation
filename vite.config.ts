import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  },
  build: {
    // Optimize build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
    },
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'api': ['axios'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Chunk size warning
    chunkSizeWarningLimit: 1000,
    // Source maps for production debugging
    sourcemap: false,
  },
  server: {
    // Development server optimization
    port: 5173,
    strictPort: false, // Try next port if 5173 is in use
    middlewareMode: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
});
