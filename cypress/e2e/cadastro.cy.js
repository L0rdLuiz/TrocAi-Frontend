describe('Cadastro de usuário', () => {

  it('Cadastro com campos vazios', () => {
    cy.visit('/register')

    cy.contains('Cadastrar').click()

    cy.on('window:alert', (msg) => {
      expect(msg).to.contains('campo')
    })
  })

  it('Cadastro com email duplicado', () => {
    cy.visit('/register')

    cy.get('#inNome').type('João')
    cy.get('#inemail').type('teste@teste.com')
    cy.get('#insenha').type('SenhaSegura123')

    cy.contains('Cadastrar').click()

    cy.on('window:alert', (msg) => {
      expect(msg).to.contains('cadastrado')
    })
  })

  it('Cadastro com senha fraca', () => {
    cy.visit('/register')

    cy.get('#inNome').type('João')
    cy.get('#inemail').type('teste2@teste.com')
    cy.get('#insenha').type('123')

    cy.contains('Cadastrar').click()

    cy.on('window:alert', (msg) => {
      expect(msg).to.contains('fraca')
    })
  })

})
