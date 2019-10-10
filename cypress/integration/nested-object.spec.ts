/// <reference types="Cypress" />

import { ROUTE } from '../../src/app/route-names';

context('Nested object', () => {
  before(() => {
      cy.visit(`http://127.0.0.1:4201/#/${ROUTE.NESTED_OBJECT}`);
    },
  );

  it('renders correctly nested object property', () => {
    cy
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(4) > div').contains('12')
      .get('#table > tbody > tr:nth-child(4) > td:nth-child(5) > div').contains('West street')
    ;
  });
});
