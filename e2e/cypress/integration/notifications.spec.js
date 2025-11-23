// Tests Cypress pour la page Notifications

describe('Notifications utilisateur', () => {
  before(() => {
    // Connexion utilisateur
    cy.visit('/login');
    cy.get('input[name="usernameOrEmail"]').type('testuser');
    cy.get('input[name="password"]').type('TestPassword123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('Affiche la liste des notifications', () => {
    cy.visit('/notifications');
    cy.contains('Notifications').should('be.visible');
    cy.get('li').should('have.length.greaterThan', 0);
  });

  it('Permet de marquer une notification comme lue', () => {
    cy.visit('/notifications');
    cy.get('button').contains('Marquer comme lu').first().click();
    cy.get('button').contains('Marquer comme lu').should('not.exist');
  });
});
