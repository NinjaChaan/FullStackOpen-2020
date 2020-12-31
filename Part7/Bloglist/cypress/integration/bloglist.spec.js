const { _ } = Cypress

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('fox')
      cy.get('#password').type('salasana')
      cy.get('#login').click()
      cy.contains('Fox Foxington logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('fox')
      cy.get('#password').type('salis')
      cy.get('#login').click()
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('fox')
      cy.get('#password').type('salasana')
      cy.get('#login').click()
      cy.contains('Fox Foxington logged in')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Fox blogging')
      cy.get('#author').type('The blogger')
      cy.get('#url').type('www.fox.blog')
      cy.contains(/^create$/).click()
      cy.wait(2000)
      cy.contains('Fox blogging The blogger')
    })

    it('A blog can be liked', function () {
      cy.contains('show').click()
      cy.contains('likes 12')
      cy.contains('like').click()
      cy.contains('likes 13')
    })

    it('A blog can be deleted', function () {
      cy.contains('Canonical string reduction')
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.contains('Canonical string reduction').should('not.exist')
    })

    it('Blogs are ordered by likes', function () {
      cy.get('.show').each(($li, index, $lis) => {
        cy.get($li).click()
      })

      cy.get('.likesfield').each(($li, index, $lis) => {
        if (index === 0)
          return
        cy.get($li).invoke('text').then((text1) => {
          const nmbr1 = parseInt(text1.match(/(\d+)/)[0])

          cy.get($lis[index - 1]).invoke('text').should((text2) => {
            const nmbr2 = parseInt(text2.match(/(\d+)/)[0])
            expect(nmbr2).to.be.gt(nmbr1)
          })
        })
      })
    })
  })
})