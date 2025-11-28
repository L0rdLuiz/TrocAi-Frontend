describe('Login', () => {

  it('Login correto', () => {
    cy.visit('/')

    cy.get('#inemail').type('teste@teste.com')
    cy.get('#insenha').type('SenhaSegura123')

    cy.contains('Login').click()

    cy.url().should('include', '/menu')
  })

  it('Login incorreto', () => {
    cy.visit('/')

    cy.get('#inemail').type('errado@errado.com')
    cy.get('#insenha').type('senhaerrada')

    cy.contains('Login').click()

    cy.on('window:alert', (msg) => {
      expect(msg).to.contains('inválido')
    })
  })

})
