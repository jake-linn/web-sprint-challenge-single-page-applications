describe("Form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza")
    })

    it("is this thing working", () => {
        expect(2 + 2).to.equal(4)
    })

    const nameInput = () => cy.get("input[name='name']"),
          sizeInput = () => cy.get("select"),
          pepperoniInput = () => cy.get("input[name='pepperoni']"),
          mushroomsInput = () => cy.get("input[name='mushrooms']"),
          pineappleInput = () => cy.get("input[name='pineapple']"),
          sausageInput = () => cy.get("input[name='sausage']"),
          instructionsInput = () => cy.get("textarea"),
          buttonInput = () => cy.get("button")

    it("Elemental Existence", () => {
        nameInput().should("exist")
        sizeInput().should("exist")
        pepperoniInput().should("exist")
        mushroomsInput().should("exist")
        pineappleInput().should("exist")
        sausageInput().should("exist")
        instructionsInput().should("exist")
        buttonInput().should("exist")
    })

    describe("Checking inputs, checkboxs, and buttons", () => {
        it("Button is disabled", () => {
            buttonInput().should("be.disabled")
        })

        it("Can type in inputs", () => {
            nameInput()
                .should("have.value", "")
                .type("John Smith")
                .should("have.value", "John Smith")
            instructionsInput()
                .should("have.value", "")
                .type("Hello there!")
                .should("have.value", "Hello there!")
        })

        it("Can use dropdown menu", () => {
            sizeInput().select("small")
            sizeInput().select("medium")
            sizeInput().select("large")
            sizeInput().select("XL")
        })

        it("Can use checkboxes", () => {
            pepperoniInput().check().uncheck()
            mushroomsInput().check().uncheck()
            pineappleInput().check().uncheck()
            sausageInput().check().uncheck()
        })

        it("Can check multiple checkboxes", () => {
            pineappleInput().check()
            sausageInput().check()
        })

        it("Button is clickable when required fields are filled in", () => {
            buttonInput().should("be.disabled")
            nameInput().type("John Smith")
            sizeInput().select("small")
            buttonInput().should("be.enabled")
            buttonInput().click()
        })
    })
})