/// <reference types="Cypress" />
context('Server sort', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://my-json-server.typicode.com/ssuperczynski/ngx-easy-table/company?',
      {
        statusCode: 200,
        body: [
          {
            phone: '+1 (949) 527-2108',
            age: 36,
            address: {
              street: 'Some street',
              number: 12,
            },
            company: 'KONGENE',
            name: 'Deanne Contreras',
            isActive: true,
            level: 'Low',
          },
          {
            phone: '+1 (878) 515-3653',
            age: 32,
            address: {
              street: 'Tumblewood street',
              number: 12,
            },
            company: 'ISOSWITCH',
            name: 'Peggy Burke',
            isActive: false,
            level: 'Medium',
          },
        ],
      }
    ).as('fullList');
    cy.intercept(
      'GET',
      'https://my-json-server.typicode.com/ssuperczynski/ngx-easy-table/company?_limit=10&_page=0&_sort=company&_order=desc',
      {
        statusCode: 200,
        body: [
          {
            phone: '+1 (934) 551-2224',
            age: 20,
            address: {
              street: 'North street',
              number: 12,
            },
            company: 'ZILLANET',
            name: 'Valentine Webb',
            isActive: false,
            level: 'Medium',
          },
        ],
      }
    ).as('sortDesc');
    cy.intercept(
      'GET',
      'https://my-json-server.typicode.com/ssuperczynski/ngx-easy-table/company?_limit=10&_page=0&_sort=company&_order=asc',
      {
        statusCode: 200,
        body: [
          {
            phone: '+1 (873) 421-3625',
            age: 38,
            address: {
              street: 'King street',
              number: 12,
            },
            company: 'ARCHITAX',
            name: 'Myles Blair',
            isActive: true,
            level: 'High',
          },
        ],
      }
    ).as('sortAsc');
    cy.visit('http://127.0.0.1:4202/#/server-sort');
  });
  describe('nothing clicked', () => {
    it('gets correct default order', () => {
      cy.wait('@fullList')
        .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
        .contains('+1 (949) 527-2108')
        .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
        .contains('KONGENE')
        .get('#table > tbody > tr:nth-child(2) > td:nth-child(1) > div')
        .contains('+1 (878) 515-3653')
        .get('#table > tbody > tr:nth-child(2) > td:nth-child(3) > div')
        .contains('ISOSWITCH');
    });
  });
  describe('"Company" column clicked', () => {
    it('gets correct company name', () => {
      cy.wait('@fullList')
        .get('#table > thead > tr > th:nth-child(3) > div')
        .click()
        .wait('@sortDesc')
        .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
        .contains('+1 (934) 551-2224')
        .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
        .contains('ZILLANET')
        .get('#table > thead > tr > th:nth-child(3) > div')
        .click()
        .wait('@sortAsc')
        .get('#table > tbody > tr:nth-child(1) > td:nth-child(1) > div')
        .contains('+1 (873) 421-3625')
        .get('#table > tbody > tr:nth-child(1) > td:nth-child(3) > div')
        .contains('ARCHITAX');
    });
  });
});
