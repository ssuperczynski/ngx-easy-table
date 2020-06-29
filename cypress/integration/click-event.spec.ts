/// <reference types="Cypress" />

context('Click event', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4201/#/click-event');
  });

  it('shows click event when row clicked', () => {
    cy.tableRow(1, 1)
      .click()
      .get('#eventArea')
      .contains(
        '{"event":"onClick","value":{"event":{"isTrusted":true},"row":{"imgUrl":"https://i.imgur.com/GLqxxnn.png","phone":"+1 (949) 527-2108","age":36,"address":{"street":"Some street","number":12},"company":"KONGENE","name":"Deanne Contreras","isActive":true,"level":"Low"},"key":"age","rowId":0,"colId":1}}'
      );
  });
  it('shows click event when pagination clicked', () => {
    cy.get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#eventArea')
      .contains('{"event":"onPagination","value":{"page":2,"limit":10}}');
  });
});
