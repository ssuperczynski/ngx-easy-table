import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: 1,
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:4202',
  },
})
