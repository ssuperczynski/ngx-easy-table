/// <reference types="Cypress" />
context('Search', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/search');
  });
  it('gets correct company name when "COLAIRE" typed', () => {
    cy.getInput('company')
      .type('COLAIRE')
      .tableRow(1, 1)
      .contains('+1 (998) 546-2953')
      .tableRow(1, 3)
      .contains('COLAIRE');
  });
  it('gets correct company name when lowercase, partial text typed', () => {
    cy.getInput('company')
      .type('{selectall}{backspace}')
      .type('colai')
      .tableRow(1, 1)
      .contains('+1 (998) 546-2953')
      .tableRow(1, 3)
      .contains('COLAIRE');
  });
  it('gets correct age when "34" typed', () => {
    cy.getInput('company')
      .type('{selectall}{backspace}')
      .should('have.value', '')
      .getInput('age')
      .type('34')
      .tableRow(1, 1)
      .contains('+1 (939) 530-3189')
      .tableRow(1, 3)
      .contains('MARKETOID');
  });
  it('gets two rows when age "36" typed, and Company has letter "k"', () => {
    cy.getInput('company')
      .type('{selectall}{backspace}')
      .type('k')
      .getInput('age')
      .type('{selectall}{backspace}')
      .type('36')
      .should('have.value', '36')
      .tableRow(1, 1)
      .contains('+1 (949) 527-2108')
      .tableRow(1, 3)
      .contains('KONGENE')
      .tableRow(2, 1)
      .contains('+1 (985) 524-3581')
      .tableRow(2, 3)
      .contains('ENTOGROK');
  });
  it('gets two rows when name "d" typed, and nested object "address.street" has letters "sou"', () => {
    cy.getInput('company')
      .type('{selectall}{backspace}')
      .getInput('age')
      .type('{selectall}{backspace}')
      .getInput('name')
      .type('d')
      .getInput('address_street')
      .type('sou')
      .tableRow(1, 1)
      .contains('+1 (948) 460-3627')
      .tableRow(1, 3)
      .contains('KNOWLYSIS')
      .tableRow(2, 1)
      .contains('+1 (902) 500-3665')
      .tableRow(2, 3)
      .contains('CALCULA');
  });
  it('gets two rows when applied string with comma separator', () => {
    cy.getInput('company')
      .type('{selectall}{backspace}')
      .getInput('age')
      .type('{selectall}{backspace}')
      .getInput('name')
      .type('{selectall}{backspace}')
      .getInput('address_street')
      .type('{selectall}{backspace}')
      .getInput('company')
      .type('kon,iso')
      .tableRow(1, 3)
      .contains('KONGENE')
      .tableRow(2, 3)
      .contains('ISOSWITCH');
  });
  it('gets two rows when applied string with comma separator and some spaces', () => {
    cy.getInput('company')
      .type('{selectall}{backspace}')
      .getInput('age')
      .type('{selectall}{backspace}')
      .getInput('company')
      .type('kon, iso ')
      .tableRow(1, 3)
      .contains('KONGENE')
      .tableRow(2, 3)
      .contains('ISOSWITCH');
  });
  it('show "no-results" message when filtering returns 0 rows', () => {
    cy.getInput('company')
      .type('{selectall}{backspace}')
      .getInput('age')
      .type('{selectall}{backspace}')
      .getInput('company')
      .type('{selectall}{backspace}')
      .getInput('company')
      .type('reallyLongString')
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1)')
      .contains('No results');
  });
});
