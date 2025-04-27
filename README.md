# EcoBlissBath - Tests automatisés Cypress

## 📝 Description du projet

Eco Bliss Bath est une start-up spécialisée dans la vente de produits de beauté écoresponsables, dont le produit principal est un savon solide.  
Ce projet contient l'automatisation des tests de validation pour leur première boutique en ligne.

Les tests couvrent :
- Les fonctionnalités critiques du site (connexion, panier).
- Les appels API (connexion, panier, produits, avis).
- Les tests de sécurité XSS.
- Les smoke tests.

---

## 🛠 Prérequis pour exécuter le projet

- **Node.js** (version 20.17.0)
- **Docker** (pour lancer le back-end)
- **NPM** (pour la gestion des packages Node)
- **Cypress** (installé localement dans le projet)

---

## 🚀 Installation

### Télécharger ou cloner le dépôt

```bash
git clone https://github.com/rihab1987/eco-bliss-bath-tests.git
cd eco-bliss-bath-tests
Back-end (API)
Depuis un terminal ouvert dans le dossier du projet :
docker-compose up
➡️ Lance le serveur API (port 8081)
docker-compose down
➡️ Arrête le serveur API.

Front-end (Application)
Depuis un terminal ouvert dans le dossier du projet front-end :
npm install
npm start
➡️ Le site sera accessible à l’adresse suivante :
http://localhost:8080/#/
Cypress (Tests automatisés)
Depuis un terminal ouvert dans le dossier du projet tests :
npx cypress open
➡️ Ouvre Cypress en mode interactif.
npx cypress run
➡️ Lance tous les tests automatiquement en mode headless (dans le terminal).

🔐 Données de connexion au site Web
Identifiant : test2@test.fr
Mot de passe : testtest

📚 API
Documentation API disponible via Swagger à l'adresse :
http://localhost:8081/api/doc

📄 Auteur
Projet réalisé par Guissouma Rihab dans le cadre du projet d'automatisation de tests Cypress.




