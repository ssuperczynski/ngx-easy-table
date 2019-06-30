/// <reference types="Cypress" />

context('Many tables', () => {
  before(() => {
      cy.visit('http://127.0.0.1:4201/#/many-tables');
    },
  );

  describe('configurationBasic', () => {
    it('gets correct default order', () => {
      cy
        .get('#configurationBasic > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains('+1 (949) 527-2108')
        .get('#configurationBasic > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('KONGENE')
        .get('#configurationBasic > tbody > tr:nth-child(2) > td:nth-child(1) > div').contains('+1 (878) 515-3653')
        .get('#configurationBasic > tbody > tr:nth-child(2) > td:nth-child(3) > div').contains('ISOSWITCH')
      ;
    });

    it('gets correct order by 2 states (asc, desc)', () => {
      cy
        .get('#configurationBasic > thead > tr.ngx-table__header > th:nth-child(3)').click()
        .get('#configurationBasic > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains('+1 (934) 551-2224')
        .get('#configurationBasic > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('ZILLANET')
        .get('#configurationBasic > thead > tr.ngx-table__header > th:nth-child(3)').click()
        .get('#configurationBasic > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains('+1 (873) 421-3625')
        .get('#configurationBasic > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('ARCHITAX')
        .get('#configurationBasic > thead > tr.ngx-table__header > th:nth-child(3)').click()
        .get('#configurationBasic > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains('+1 (934) 551-2224')
        .get('#configurationBasic > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('ZILLANET')
      ;
    });
    it('has rows limit set to 3', () => {
      cy
        .get('#paginationconfigurationBasic > div > div.ngx-pagination-range > div > div > div')
        .contains('3');
    });
  });

  describe('configurationAdvanced', () => {
    it('gets correct default order', () => {
      cy
        .get('#configurationAdvanced > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains('+1 (949) 527-2108')
        .get('#configurationAdvanced > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('KONGENE')
        .get('#configurationAdvanced > tbody > tr:nth-child(2) > td:nth-child(1) > div').contains('+1 (878) 515-3653')
        .get('#configurationAdvanced > tbody > tr:nth-child(2) > td:nth-child(3) > div').contains('ISOSWITCH')
      ;
    });

    it('gets correct order by 3 states (asc, desc, default)', () => {
      cy
        .get('#configurationAdvanced > thead > tr.ngx-table__header > th:nth-child(3)').click()
        .get('#configurationAdvanced > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains('+1 (934) 551-2224')
        .get('#configurationAdvanced > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('ZILLANET')
        .get('#configurationAdvanced > thead > tr.ngx-table__header > th:nth-child(3)').click()
        .get('#configurationAdvanced > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains('+1 (873) 421-3625')
        .get('#configurationAdvanced > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('ARCHITAX')
        .get('#configurationAdvanced > thead > tr.ngx-table__header > th:nth-child(3)').click()
        .get('#configurationAdvanced > tbody > tr:nth-child(1) > td:nth-child(1) > div').contains('+1 (949) 527-2108')
        .get('#configurationAdvanced > tbody > tr:nth-child(1) > td:nth-child(3) > div').contains('KONGENE')
      ;
    });
    it('has rows limit set to 4', () => {
      cy
        .get('#paginationconfigurationAdvanced > div > div.ngx-pagination-range > div > div > div')
        .contains('4');
    });
  });
});
