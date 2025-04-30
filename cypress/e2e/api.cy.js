// Tests de l’API commandes sans authentification
describe("GET /orders sans authentification", () => {
  it("doit retourner 401 lorsqu'on accède aux commandes sans être connecté", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false //  Ne pas faire échouer le test 
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

// Tests de l’API commandes avec authentification
describe('API commandes', () => {
  // Connexion avant tous les tests
  before(() => {
    cy.signIn("test2@test.fr", "testtest").then((token) => {
      Cypress.env('token', token);// On stocke le token en variable d’environnement
    });
  });

  // Lecture du panier
  it("doit retourner la liste des produits dans le panier", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      headers: {
        "Authorization": "Bearer " + Cypress.env('token')
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;//Le corps de la réponse doit exister
    });
  });
  // Ajout d’un produit disponible au panier
  it('doit ajouter un produit au panier', () => {
    cy.request({
      method: 'PUT',
      url: "http://localhost:8081/orders/add",
      headers: {
        "Authorization": "Bearer " + Cypress.env('token')
      },
      body: {
        product: 5, // ID du produit à ajouter
        quantity: 1, // Quantité à ajouter
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200); // Ajout réussi
    });
  });
   // Tentative d’ajout d’un produit en rupture de stock
  it('ne doit pas permettre l’ajout d’un produit en rupture de stock', () => {
    cy.request({
      method: 'PUT',
      url: 'http://localhost:8081/orders/add',
      headers: {
        "Authorization": "Bearer " + Cypress.env('token')
      },
      body: {
        product: 3, // ID du produit à ajouter (en rupture de stock)
        quantity: 1 // Quantité à ajouter
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400); //Erreur attendue
    });
  });
});

// Test de récupération d’un produit par ID
describe(' API produits ', () => {
  let productCard;

  it('doit retourner les détails d’un produit par ID', () => {
    cy.request({
      method: 'GET',
      url: "http://localhost:8081/products/4",
    }).then((response) => {
      expect(response.status).to.equal(200);
      productCard = response.body;
      expect(productCard.id).to.eq(4);
      expect(productCard.availableStock).to.be.a("number");
      expect(productCard.name).to.eq("Chuchotements d'été");
      expect(productCard.skin).to.eq("Sèche");
      expect(productCard.aromas).to.eq("Nature et végétal");
      expect(productCard.ingredients).to.eq("Huile d'olive, glycérine végétale");
      expect(productCard).to.have.property("description");
      expect(productCard.price).to.be.a("number");
    });
  });
});

// Test sur l'ajout d’un avis
describe('Reviews API', () => {
  before(() => {
    Cypress.env('token', null); // Réinitialiser le token avant chaque test
    cy.signIn("test2@test.fr", "testtest").then((token) => {
      Cypress.env('token', token); // Authentification avant le test
    });
  });

  // Test sur l'ajout d’un avis
it('doit ajouter un avis ', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/reviews',
      headers: {
        "Authorization": "Bearer " + Cypress.env('token')
      },
      body: {
        title: "helllo",
        comment: "hello you",
        rating: 5,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  
  });


  
  