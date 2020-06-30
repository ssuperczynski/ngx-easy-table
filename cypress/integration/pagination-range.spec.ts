/// <reference types="cypress" />

context('Pagination range', () => {
  before(() => {
    cy.visit('http://127.0.0.1:4201/#/pagination-range');
  });

  it('gets correct pagination numbers when paginationMaxSize is set to 7', () => {
    cy.get('#pagination-controls > ul > li.current > span:nth-child(2)')
      .contains('1')
      .get('#pagination-controls > ul > li:nth-child(4) > a > span:nth-child(2)')
      .contains('2')
      .get('#pagination-controls > ul > li:nth-child(5) > a > span:nth-child(2)')
      .contains('3')
      .get('#pagination-controls > ul > li:nth-child(6) > a > span:nth-child(2)')
      .contains('4')
      .get('#pagination-controls > ul > li:nth-child(7) > a > span:nth-child(2)')
      .contains('5')
      .get('#pagination-controls > ul > li:nth-child(9) > a > span:nth-child(2)')
      .contains('17');
  });
  it('pagination range by default is selected to 10', () => {
    cy.get('#rowAmount > div > div').contains('10');
  });
});
