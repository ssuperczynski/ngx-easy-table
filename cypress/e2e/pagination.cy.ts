/// <reference types="cypress" />

context('Pagination', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4202/#/pagination');
  });

  it('gets correct phone when no pagination clicked', () => {
    cy.get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains(
      '+1 (949) 527-2108'
    );
  });
  it('gets correct phone when 2 pagination clicked', () => {
    cy.get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (902) 500-3665');
  });
  it('gets correct phone when 3 pagination clicked', () => {
    cy.get('#pagination-controls > ul > li:nth-child(5) > a')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (882) 527-2652');
  });
  it('gets correct phone when go back to 2 pagination', () => {
    cy.get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (902) 500-3665');
  });
  it('gets correct phone when pagination NEXT button clicked', () => {
    cy.get('#pagination-controls > ul > li:nth-child(4) > a')
      .click()
      .get('#pagination-controls > ul > li.pagination-next > a')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (882) 527-2652');
  });
  it('gets correct phone when pagination PREV button clicked', () => {
    cy.get('#pagination-controls > ul > li:nth-child(5) > a')
      .click()
      .get('#pagination-controls > ul > li.pagination-previous > a')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (902) 500-3665');
  });
  it('gets correct phone when 25 range clicked', () => {
    cy.get('#rowAmount > div > div')
      .click()
      .get('#rowAmount > div > ul > li:nth-child(3)')
      .click()
      .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
      .contains('+1 (949) 527-2108')
      .get('#table > tbody > tr:nth-child(21) > td:nth-child(1) > div')
      .contains('+1 (882) 527-2652');
  });
});
