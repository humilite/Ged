// Cypress tests approfondis: scénarios principaux, erreurs et performance

describe('Flux utilisateur avancé', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('admin', 'password'); // Assurez-vous que la commande personnalisée login est définie
  });

  it('doit compléter un workflow de validation', () => {
    cy.visit('/workflow-validation');
    cy.get('[data-testid="start-workflow"]').click();
    cy.get('[data-testid="approve-workflow"]').click();
    cy.get('[data-testid="workflow-success"]').should('contain', 'Validation réussie');
  });

  it('gère les erreurs API correctement', () => {
    cy.intercept('GET', '/api/documents', { statusCode: 500, body: { error: 'Erreur serveur' } });
    cy.visit('/documents');
    cy.contains('Erreur serveur').should('be.visible');
  });

  it('teste les performances de chargement', () => {
    cy.visit('/dashboard');
    cy.window().then(win => {
      const perf = win.performance;
      expect(perf.timing.loadEventEnd - perf.timing.navigationStart).to.be.lessThan(2000);
    });
  });

  it('teste la recherche avancée avec plusieurs termes', () => {
    cy.visit('/search');
    cy.get('[data-testid="search-input"]').type('Rapport{enter}');
    cy.get('[data-testid="search-results"]').should('have.length.greaterThan', 0);
  });
});
