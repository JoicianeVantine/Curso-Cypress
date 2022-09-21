// CAT-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Teste Teste Teste TesteTesteTeste TesteTeste Teste Teste TesteTesteTeste TesteTeste Teste Teste Teste Teste Teste ";
    cy.get("#firstName").type("Joi");
    cy.get("#lastName").type("Vantine");
    cy.get("#email").type("joi.vantine@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Joi");
    cy.get("#lastName").type("Vantine");
    cy.get("#email").type("joi.vantinegmail.com");
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("Campo telefone continua vazio quando preenchido com valor não numérico", function () {
    cy.get("#phone").type("abcdefghij").should("have.value", "");
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido", function () {
    cy.get("#firstName").type("Joi");
    cy.get("#lastName").type("Vantine");
    cy.get("#email").type("joi.vantine@gmail.com");
    cy.get("#phone").type("24998623865");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();

    //cy.get(".error").should("be.visible");
    cy.get(".success").should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome e e-mail, telefone e área de texto", function () {
    cy.get("#firstName").type("Joi").should("have.value", "Joi").clear().should("have.value", "");

    cy.get("#lastName")
      .type("Vantine")
      .should("have.value", "Vantine")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("joi.vantine@gmail.com")
      .should("have.value", "joi.vantine@gmail.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("24998623865")
      .should("have.value", "24998623865")
      .clear()
      .should("have.value", "");

    cy.get("#open-text-area")
      .type("teste")
      .should("have.value", "teste")
      .clear()
      .should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o formulário sem preencher os dados obrigatórios", function () {
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("Envia o formulário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });

  it("Seleciona um produto (Youtube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it('Selecionando a opção pelo indíce', () => {
    cy.get("#product").select(3)
  })

  it('Marca a opção do tipo radio', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('Marca ambas os checkbox e desmarca o último', () => {
    cy.get('input[type = "checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio', () => {
    cy.get("#firstName").type("Joi");
    cy.get("#lastName").type("Vantine");
    cy.get("#email").type("joi.vantine@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  })

  it('Seleciona um arquivo da pasta Fixtures', () => {
    cy.get('input[type = "file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })
  })

  it('Seleciona um arquivo simulando drag and drop', () => {
    cy.get('input[type = "file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })
  })

  it('Seleciona um arquivo utilizando uma fixture a qual foi dada um alias', () => {
    cy.fixture('example.json').as('teste')
    cy.get('input[type = "file"]')
      .selectFile('@teste')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Acessa a página de política de privacidade removendo o target e então abrindo em outra aba', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')

  })

  // it('Marca cada tipo de atendimento', () => {

  // })

  // it('Marca cada tipo de atendimento', () => {

  // })

});

