describe('Central de atendimento ao cliente TAT.cy.js', () => {
  beforeEach( () => {
    cy.visit('./src/index.html')
  }
)
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube') //selecionando pelo texto
    .should('have.value','youtube')
    cy.get('#product').select('mentoria') //selecionando pelo value
    .should('have.value','mentoria')
    cy.get('select').select(1)
    .should('have.value','blog') //selecionando pelo índice
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value=ajuda]').check()
    .should('be.checked')
    cy.get('input[type="radio"][value=elogio').check()
    .should('be.checked')
    cy.get('input[type="radio"][value=feedback]').check()
    .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .each((typeOfService) => {
      cy.wrap(typeOfService).check()
      .should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').as('checkboxes').check()
    .each(checkbox => {
      expect(checkbox[0].checked).to.equal(true)
    })
    cy.get('@checkboxes').last().uncheck()
  })
  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[type="checkbox"][value="phone"]').check()
    cy.get('.phone-label-span').should('be.visible')
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.error').should('be.visible')
  })
})
