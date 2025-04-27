// Tests pour vérifier l'authentification via l'API
describe.only('API Login Test', () => {
     // Test 1 : Connexion réussie avec identifiants valides
    it('doit se connecter avec des identifiants valides et retourner un statut 200', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        body: {
          username: 'test2@test.fr',
          password: 'testtest'
        }
      }).then((response) => {
        // // Vérifie que le code de réponse est bien 200 (succès)
        expect(response.status).to.eq(200);
        // Vérifie que la réponse contient un token (connexion réussie)

        expect(response.body).to.have.property("token");
      });
    });
    // Test 2 : Connexion échouée avec un mauvais identifiant
    it('doit retourner une erreur 401 pour un utilisateur inconnu', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        body: {
          username: 'test@test.fr',
          password: 'testtest'
        },
        failOnStatusCode: false // Permet de ne pas échouer le test sur un statut d'erreur
      }).then((response) => {
        // // Vérifie que l’API répond bien avec un statut 401 (non autorisé)
        expect(response.status).to.eq(401);
      });
    });
  })
     