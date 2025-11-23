// Test basique end-to-end avec Cypress pour le flux principal utilisateur

describe('Flux principal utilisateur', () => {
  before(() => {
    // Visite la page d'accueil
    cy.visit('/');
  });

  it('Permet la connexion', () => {
    cy.get('input[name="usernameOrEmail"]').type('testuser');
    cy.get('input[name="password"]').type('TestPassword123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Tableau de bord').should('be.visible');
  });

  it('Peut déposer un document', () => {
    cy.visit('/document-upload');
    cy.get('input[type="file"]').attachFile('example.pdf'); // fichier example.pdf doit exister dans fixtures
    cy.get('button[type="submit"]').click();
    cy.contains('Upload réussi').should('be.visible');
  });

  it('Peut effectuer une recherche avancée', () => {
    cy.visit('/search');
    cy.get('input[placeholder="Recherche"]').type('rapport{enter}');
    cy.contains('Résultats de recherche').should('be.visible');
  });

  it('Peut accéder à la gestion des utilisateurs', () => {
    cy.visit('/user-management');
    cy.contains('Gestion des utilisateurs').should('be.visible');
  });

  it('Peut consulter son profil', () => {
    cy.visit('/profile');
    cy.contains('Profil utilisateur').should('be.visible');
  });
});
