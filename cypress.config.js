import { defineConfig } from "cypress";


export default defineConfig({
  e2e: {
    baseUrl: process.env.CI ? 'http://localhost:5174' : 'https://localhost:5174',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});



