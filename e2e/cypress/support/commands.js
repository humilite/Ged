/// <reference types="cypress" />

// Importation de la librairie d'upload de fichiers pour Cypress
import 'cypress-file-upload';

// Ajout d'une commande personnalisée pour gérer l'upload de fichiers
Cypress.Commands.add('attachFile', { prevSubject: 'element' }, (input, fileName) => {
  return cy.wrap(input).attachFile(fileName);
});
