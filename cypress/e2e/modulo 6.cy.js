describe('template spec', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
    .then(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
    .then(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json').as('arquivo')
    cy.get('input[type="file"]').selectFile('@arquivo')
    .then(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contais('a', 'Politica de Privacidade')
    .should('have.attr','href','privacy.html')
    .and('have.attr','target','_blan')
  })
  it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a','Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1','CAC TAT - Política de Privacidade')
    .should('be.visible')
  })
})

it('testa a página da política de privacidade de forma independente', () => {
  cy.origin('file:///C:/Users/isabelle/Desktop/curso-cypress/src/index.html')
    cy.visit('/privacy.html')
  
})