// Tests e2e supplémentaires pour scénarios d'erreurs et performances

describe('Tests avancés erreurs et performance', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('admin', 'password'); // Commande custom Cypress à implémenter
  });

  it('gère une erreur serveur sur récupération des documents', () => {
    cy.intercept('GET', '/api/documents', { statusCode: 500, body: { error: 'Erreur interne' } });
    cy.visit('/documents');
    cy.contains('Erreur interne').should('be.visible');
  });

  it('teste la charge sur la page tableau de bord', () => {
    cy.visit('/dashboard');
    cy.window().then(win => {
      const perf = win.performance;
      expect(perf.timing.loadEventEnd - perf.timing.navigationStart).to.be.lessThan(2500);
    });
  });

  it('teste la gestion des erreurs de validation formulaire', () => {
    cy.visit('/user-management');
    cy.get('button').contains('Ajouter utilisateur').click();
    cy.get('input[name="email"]').type('email_invalide');
    cy.get('button').contains('Soumettre').click();
    cy.contains('Format d\'email invalide').should('be.visible');
  });
});
