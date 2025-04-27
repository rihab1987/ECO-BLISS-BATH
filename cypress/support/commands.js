// Commande personnalisée pour se connecter via API et récupérer un token
Cypress.Commands.add('signIn', (username, password) => {
  return cy.request({ // Envoyer une requête HTTP
    method: 'POST',
    url: `${Cypress.env("apiUrl")}/login`, // URL de l'API récupérée depuis les variables d'environnement
    body: { // Corps de la requête contenant les informations d'identification
      username,
      password
    },
  }).then((response) => { // Un fois la requête terminée, on traite la réponse
    const token = response.body.token; // Extraire le token de la réponse
    return token; // Retourner le token
  });
});
// Commande personnalisée pour cibler un élément par son attribut data-cy

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`,  ...args)
})
// Commande personnalisée pour effectuer une connexion utilisateur via l'interface graphique
  
Cypress.Commands.add("userLogin", () => {
  cy.visit("http://localhost:8080/#/"); // Accéder à la page d'accueil
  cy.getBySel("nav-link-login").click(); // Cliquer sur le lien de connexion
  cy.getBySel("login-input-username").type("test2@test.fr"); // Email valide
  cy.getBySel("login-input-password").type("testtest"); // Mot de passe valide
  cy.getBySel("login-submit").click(); // Cliquer sur le bouton de connexion
  cy.getBySel("nav-link-cart").should('be.visible'); // Vérifier que le lien du panier est visible
})
// Commande personnalisée pour vider complètement le panier

Cypress.Commands.add("clearCart", () => {
  cy.getBySel("nav-link-cart").click(); // Aller dans le panier
  cy.getBySel("cart-line-delete").should("be.visible").click({ multiple: true }); // Supprimer tous les produits du panier
  cy.getBySel("cart-empty").should("be.visible"); // Vérifier que le panier est vide
});



  



  

  
