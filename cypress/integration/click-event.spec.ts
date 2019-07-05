/// <reference types="Cypress" />

context('Click event', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/click-event');
    },
  );

  it('shows click event when row clicked', () => {
    cy
      .tableRow(1, 1).click()
      .get('#eventArea')
      .contains('{\n' +
      '  "event": "onClick",\n' +
      '  "value": {\n' +
      '    "event": {\n' +
      '      "isTrusted": false\n' +
      '    },\n' +
      '    "row": {\n' +
      '      "imgUrl": "https://i.imgur.com/GLqxxnn.png",\n' +
      '      "phone": "+1 (949) 527-2108",\n' +
      '      "age": 36,\n' +
      '      "address": {\n' +
      '        "street": "Some street",\n' +
      '        "number": 12\n' +
      '      },\n' +
      '      "company": "KONGENE",\n' +
      '      "name": "Deanne Contreras",\n' +
      '      "isActive": true,\n' +
      '      "level": "Low"\n' +
      '    },\n' +
      '    "key": "phone",\n' +
      '    "rowId": 0,\n' +
      '    "colId": 0\n' +
      '  }\n' +
      '}');
  });
  it('shows click event when pagination clicked', () => {
    cy.get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#eventArea')
      .contains('{\n' +
        '  "event": "onPagination",\n' +
        '  "value": {\n' +
        '    "page": 2,\n' +
        '    "limit": 10\n' +
        '  }\n' +
        '}');
  });
});
