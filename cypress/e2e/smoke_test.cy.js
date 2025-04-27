// Groupe de tests pour vérifier que les éléments essentiels fonctionnent
describe("smoke tests",()=>{
//Test 1 :Vérifie que tous les champs de connexion sont visibles
    it ("Vérifie la présence des champs et boutons de connexion",()=>{
        cy.visit("http://localhost:8080/#/login")
        cy.getBySel("login-input-username").should ("be.visible")
        cy.getBySel("login-input-password").should ("be.visible")
        cy.getBySel("login-submit").should ("be.visible")
    })
// Test 2 : Vérifie que les boutons "Ajouter au panier" sont visibles après connexion
    it("Vérifie la présence du bouton Ajouter au panier après connexion", () => {
        cy.userLogin() // Se connecte à l'application via l'interface graphique
        cy.getBySel("nav-link-products").click()
        //Consult a product
        cy.getBySel("product-link").first().click()
        //Verify if the Add to Cart button is visible
        cy.getBySel("detail-product-add").should("be.visible")
    })
 // Test 3 : Vérifie que le champ de disponibilité du produit est bien affiché
    it("Vérifie la présence du champ de disponibilité du produit", () => {
        cy.visit("http://localhost:8080/#/products") // va sur la page des produits
        cy.getBySel("product-link").first().click() // clique sur le premier produit
        //Verify if the product availability field is visible
        cy.getBySel("detail-product-stock").should("be.visible")// // Vérifie si le champ de disponibilité du produit est visible
    })
})