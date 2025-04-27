describe('Test de sécurité – Protection contre les failles XSS', () => {

    before(() => {
      // Authentification avant le test
      cy.signIn("test2@test.fr", "testtest").then((token) => {
        Cypress.env('token', token); // Stocker le token d'accès
      });
    });
  
    // Test de protection contre les failles XSS
    it("ne doit pas permettre l'ajout d'un avis contenant un script XSS", () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        failOnStatusCode: false, // Ne pas faire échouer automatiquement en cas d'erreur
        headers: {
          "Authorization": "Bearer " + Cypress.env('token')
        },
        body: {
          title: "Hello",
          comment: "<script>alert('Hello')</script>", // Script potentiellement malveillant
          rating: 5,
        }
      }).then((response) => {
        expect(response.status).to.be.eq(500); // Le backend doit rejeter l'injection XSS
      });
    });
  
  });
  