/// <reference types="Cypress" />

context('Click event', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/click-event');
    },
  );

  it('shows click event when row clicked', () => {
    cy
      .tableRow(1, 1)
      .click()
      .get('#eventArea')
      .contains('"event": "onClick"')
      .contains('"value":')
      .contains('{ "event":')
      .contains('"row":')
      .contains('"imgUrl": "https://i.imgur.com/GLqxxnn.png",')
      .contains('"phone": "+1 (949) 527-2108",')
      .contains('"age": 36,')
      .contains('"address": {')
      .contains('"street": "Some street",')
      .contains('"number": 12')
      .contains('"company": "KONGENE",')
      .contains('"name": "Deanne Contreras",')
      .contains('"isActive": true,')
      .contains('"level": "Low"')
      .contains('"key": "phone",')
      .contains('"rowId": 0')
      .contains('"colId": 0');
  });

  it('shows click event when pagination clicked', () => {
    cy.get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#eventArea')
      .contains('"event": "onPagination"')
      .contains('"value": {')
      .contains('"page": 2,')
      .contains('"limit": 10');
  });
});
