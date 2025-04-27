describe('Login', () => {
   // Test 1 : Connexion avec identifiants valides
  it('doit connecter l’utilisateur avec les bons identifiants', () => {
      cy.visit("http://localhost:8080/#/") // Accéder à la page d'accueil
      cy.getBySel("nav-link-login").click() // Cliquer sur le lien de connexion
      cy.getBySel('login-input-username').type("test2@test.fr") //Email valide
      cy.getBySel('login-input-password').type("testtest") //Mot de passe valide 
      cy.getBySel('login-submit').click() // Clique sur se connecter 
      cy.getBySel('nav-link-cart').should('have.text', "Mon panier") // Vérifie que le lien du panier est visible
  });


    // Test 2 : Connexion échouée avec un identifiant incorrect
  it('ne doit pas connecter l’utilisateur avec un mauvais identifiant', () => {
      cy.visit("http://localhost:8080/#/")
      cy.getBySel("nav-link-login").click()
      cy.getBySel('login-input-username').type("test@test.fr")
      cy.getBySel('login-input-password').type("testtest")
      cy.getBySel('login-submit').click()
      cy.getBySel('nav-link-cart').should("not.exist") // Le lien du panier ne doit pas être visible
      cy.getBySel('login-errors').should("be.visible") // Vérifie que le message d'erreur est visible
  });

  // // Test 3 : Connexion échouée sans identifiant et mot de passe
  it('ne doit pas connecter l’utilisateur sans identifiants', () => {
      cy.visit("http://localhost:8080/#/")
      cy.getBySel("nav-link-login").click()
      cy.getBySel('login-submit').click()
      cy.getBySel('nav-link-cart').should("not.exist")
      cy.getBySel('login-errors').should("be.visible")
  });
})
  
  