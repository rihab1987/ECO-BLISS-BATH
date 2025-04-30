describe("Verification du fonctionnement du panier", () => {
   

    it("Ajouter un produit disponible au panier(stock>1) et vérifier la mise à jour du stock", () => {
        cy.userLogin () // Connexion de l'utilisateur
        cy.getBySel("nav-link-products").click(); // Cliquer sur l'onglet Produits
        cy.getBySel ("product-link").eq(4).click(); // Sélection du 5ème produit 
        cy.getBySel("detail-product-stock").invoke('text')
        .should((text) => {
            const regex = /(-?\d+) en stock/  // Expression régulière pour extraire le stock disponible
            const match = text.match(regex) // Cherche le stock dans le texte
            const stockNr = parseInt(match[1], 10) // Conversion du texte en nombre entier
            expect(stockNr).to.be.gte(1) // Vérifie que le stock est supérieur ou égal à 1      
        }).then((text) => {
            const stockText = text.trim(); // Supprime les espaces autour du texte
            const stockNr = parseInt(stockText.match(/\d+/)) // Extraire et convertir le stock en nombre
            cy.log("Stock:"+ stockNr) // Affiche le stock dans la console
            cy.getBySel("detail-product-add").click() 
            cy.wait(1000) // Attendre que le produit soit ajouté au panier
            cy.getBySel("cart-line-name").should("be.visible").contains("Extrait de nature") // Vérifie que le produit est dans le panier
            cy.go('back') //  Retourne à la page produit
            // Vérifier si le niveau de stock a été réduit
            const newStock = stockNr - 1
            cy.getBySel("detail-product-stock").invoke("text").should("match", new RegExp(newStock +" en stock")) // Vérifie que le stock a été mis à jour
            cy.clearCart(); // Vider le panier après le test
            cy.getBySel("cart-empty").should("be.visible"); // Vérifier que le panier est vide
        })
    })  
})  

describe("Verification du contenu de panier via API", () => {
    it("cliquer sur le bouton ajouter au panier", () => {
        cy.userLogin();
        cy.getBySel("nav-link-products").click();
        cy.getBySel("product-link").eq(4).click();
        cy.getBySel("detail-product-add").click();
        cy.getBySel("nav-link-cart").should("be.visible"); 
    });

    it("Connection API pour obtenir un token", () => {
        cy.signIn("test2@test.fr", "testtest").then((token) => {
            Cypress.env('token', token); // On stocke le token en variable d’environnement
        }); 
    })  
    

    it("Verifier que le produit a été ajouté au panier via API", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:8081/orders", // Récupération du contenu du panier via API
            headers: {
                "Authorization": "Bearer " + Cypress.env('token') // Utilisation du token pour s'authentifier
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Vérifie que le code de réponse est 200 (succès)
            let orderLines = response.body.orderLines; 
            orderLines.forEach((orderLine) => { // Parcourt chaque ligne de commande
                if (orderLine.product.id === 7) { // Vérifie si le produit avec l'identifiant 7 est présent dans le panie
                    expect(orderLine.quantity).to.be.equal(1); // Vérifie que la quantité est égale à 1
                } else { // Si le produit n'est pas trouvé, on lance une erreur
                    throw new Error("Product with id 7 not found in the cart"); // Lance une erreur si le produit n'est pas trouvé
                }
            });
        });
    });
});


    
describe ("Verification des limites de saisie", () => {
    beforeEach("connexion de l'utilisateur", () => {
        cy.userLogin() 
    })
    
    it("Ajouter une quantité négative", () => {
        cy.getBySel("nav-link-products").click(); // Cliquer sur l'onglet Produits
        cy.getBySel ("product-link").eq(5).click(); // Sélection du 6ème produit
        cy.getBySel ("detail-product-quantity").click(); // Cliquer sur le champ de quantité
        cy.getBySel ("detail-product-quantity").clear(); 
        cy.getBySel ("detail-product-quantity").type("-2"); // Saisir une quantité négative
        cy.getBySel ("detail-product-add").click(); // Cliquer sur le bouton Ajouter au panier
        cy.url().should("include", "/products") // Vérifier que l'URL contient "/products"
        cy.getBySel("nav-link-cart").click(); // Aller dans le panier
        cy.getBySel("cart-empty").should("be.visible"); // Vérifier que le panier est vide
        
    })
    
    it("Ajouter une quantité  > 20", () => {
        cy.getBySel("nav-link-products").click(); // Cliquer sur l'onglet Produits
        cy.getBySel("product-link").eq(4).click(); // Sélection du 5ème produit
        cy.getBySel("detail-product-quantity").click(); // Cliquer sur le champ de quantité
        cy.getBySel("detail-product-quantity").clear(); 
        cy.getBySel("detail-product-quantity").type("21"); // Saisir une quantité supérieure à 20
      
        cy.getBySel("detail-product-add").click(); // Cliquer sur le bouton Ajouter au panier
        cy.getBySel("nav-link-cart").click(); // Aller dans le panier
        cy.getBySel("cart-line-delete").should("be.visible"); // Vérifier que le produit est dans le panier
        cy.clearCart(); // Vider le panier après le test
        cy.getBySel("cart-empty").should("be.visible"); // Vérifier que le panier est vide


    });
})
    










  
    


    

  




 
