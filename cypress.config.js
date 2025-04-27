// On importe la fonction defineConfig depuis le module cypress.
// Elle permet de structurer proprement la configuration.
const { defineConfig } = require("cypress");

// On exporte la configuration principale de Cypress
module.exports = defineConfig({
  projectId: 'ffp1jw',

// Variables d’environnement personnalisées
  
  env: {
    apiUrl: "http://localhost:8081" // URL de l’API (backend) qu'on va interroger dans les tests

  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8080/", // URL de base de l/ application frontend (côté client) pour les tests
  },
  
});
