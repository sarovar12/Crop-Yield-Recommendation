import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'leaflet-control-geocoder': path.resolve(
        __dirname,
        'node_modules/leaflet-control-geocoder/dist/Control.Geocoder.js'
      ),
    },
  },
});
