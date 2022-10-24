/// <reference types="cypress" />

context('Infinite scroll server', () => {
  describe('on scroll', () => {
    it('loads next items', () => {
      cy.intercept(
        'GET',
        'https://my-json-server.typicode.com/ssuperczynski/ngx-easy-table/company?_limit=10&_page=1',
        {
          statusCode: 200,
          body: [
            {
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
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
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
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
            {
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
              phone: '+1 (844) 593-2360',
              age: 21,
              address: {
                street: 'East street',
                number: 12,
              },
              company: 'HIVEDOM',
              name: 'Josephine Reilly',
              isActive: true,
              level: 'High',
            },
            {
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
              phone: '+1 (800) 413-3813',
              age: 24,
              address: {
                street: 'West street',
                number: 12,
              },
              company: 'EMERGENT',
              name: 'Phillips Fry',
              isActive: false,
              level: 'Low',
            },
            {
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
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
            {
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
              phone: '+1 (948) 460-3627',
              age: 31,
              address: {
                street: 'South street',
                number: 12,
              },
              company: 'KNOWLYSIS',
              name: 'Heidi Duncan',
              isActive: true,
              level: 'High',
            },
            {
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
              phone: '+1 (841) 479-3920',
              age: 30,
              address: {
                street: 'Buffalo street',
                number: 12,
              },
              company: 'TYPHONICA',
              name: 'Poole Dodson',
              isActive: false,
              level: 'Low',
            },
            {
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
              phone: '+1 (998) 546-2953',
              age: 37,
              address: {
                street: 'Onorato street',
                number: 12,
              },
              company: 'COLAIRE',
              name: 'Marie Molina',
              isActive: false,
              level: 'Medium',
            },
            {
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
              phone: '+1 (811) 511-2927',
              age: 31,
              address: {
                street: 'Ontario street',
                number: 12,
              },
              company: 'OMNIGOG',
              name: 'Monica Frazier',
              isActive: true,
              level: 'High',
            },
            {
              imgUrl: 'https://i.imgur.com/GLqxxnn.png',
              phone: '+1 (967) 504-3593',
              age: 35,
              address: {
                street: 'Canada street',
                number: 12,
              },
              company: 'ENERVATE',
              name: 'Kinney Logan',
              isActive: true,
              level: 'Low',
            },
          ],
        }
      ).as('firstCall');
      cy.visit('http://127.0.0.1:4202/#/infinite-scroll-server');
      const tenthItem =
        '#table > tbody > cdk-virtual-scroll-viewport > div.cdk-virtual-scroll-content-wrapper > tr:nth-child(10) > td:nth-child(3) > div';
      cy.wait('@firstCall')
        // .get(tenthItem)
        // .should('not.be.visible')
        .get('#table > tbody > cdk-virtual-scroll-viewport')
        .scrollTo(0, 500, { duration: 200 })
        .get(tenthItem)
        .should('to.be.visible');
    });
  });
});
