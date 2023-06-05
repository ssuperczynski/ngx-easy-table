import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://127.0.0.1:4202',
  },
});
