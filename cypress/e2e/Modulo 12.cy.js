describe('testes avançados', () => {
   beforeEach( () => {
    cy.visit('./src/index.html')
  }
)
it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

it('preenche o campo área de texto usando o comando invoke', () => {
  cy.get('#open-text-area').invoke('val', 'alegria')
  .should('have.value', 'alegria')
})

it.only('faz uma requisição HTTP', () => {
  cy.request({
    method: 'GET',
    url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html',
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.statusText).to.equal('OK')
    expect(response.body).include('CAC TAT')
  })
})



})