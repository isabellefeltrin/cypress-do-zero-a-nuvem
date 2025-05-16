describe('Central de atendimento ao cliente TAT.cy.js', () => {
  beforeEach( () => {
    cy.visit('./src/index.html')
  }
)
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  Cypress._.times( 5, () => {it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Isabelle')
    cy.get('#lastName').type('Feltrin')
    cy.get('#email').type('isalufeltrin@gmail.com')
    cy.get('#open-text-area').type('teste cypress')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible','contain','Sucesso')
  })})

  Cypress._.times( 5, () => {it('Exercício extra 1', () => {
    const textolongo = Cypress._.repeat('teste ',100)
    cy.get('#firstName').type('Isabelle')
    cy.get('#lastName').type('Feltrin')
    cy.get('#email').type('isalufeltrin@gmail.com')
    cy.get('#open-text-area').type(textolongo,{delay:0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible','contain','Sucesso')
  })})

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').type('Isabelle')
    cy.get('#lastName').type('Feltrin')
    cy.get('#email').type('isalufeltringmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000).get('.error').should('not.be.visible')
  })

  it('validação do campo telefone', () => {
    cy.get('#firstName').type('Isabelle')
    cy.get('#lastName').type('Feltrin')
    cy.get('#email').type('isalufeltringmail.com')
    cy.get('#phone').type('abc').should('have.value','')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()  => {
    cy.clock()
    cy.get('#firstName').type('Isabelle')
    cy.get('#lastName').type('Feltrin')
    cy.get('#email').type('isalufeltringmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.tick(3000).get('.error').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Isabelle').should('have.value','Isabelle')
    cy.get('#lastName').type('Feltrin')
    cy.get('#email').type('isalufeltringmail.com')
    cy.get('#phone').type('abc').should('have.value','')
    cy.get('#open-text-area').type('teste')
    cy.get('#firstName').clear().should('have.value','')
    cy.get('#lastName').clear().should('have.value','')
    cy.get('#email').clear().should('have.value','')
    cy.get('#phone').clear().should('have.value','')
    cy.get('#open-text-area').clear().should('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    cy.get('button[type="submit"]').click()
    cy.tick(3000).get('.error').should('not.be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.tick(3000).get('.error').should('not.be.visible')

  })
})