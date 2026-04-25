import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Aponta para o arquivo de config customizado
      configFile: './tailwind.config.mjs',
    }),
  ],
  // Habilita compressão para performance máxima
  compressHTML: true,
  // Build output para site estático
  output: 'static',
});
