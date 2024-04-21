describe("Logout function", () => {
    it("Logs in the user, logs out, and makes sure the login button exists afterwards.", () => {
        cy.visit("http://127.0.0.1:5500/");
        cy.wait(800);
        cy.get('.modal-footer button[data-auth="login"]').click();
        cy.get("#loginEmail").invoke("val", "test4321@stud.noroff.no");
        cy.get("#loginPassword").invoke("val", "4321test1234");
        cy.wait(800);
        cy.get("#loginForm button").contains("Login").click();
        cy.wait(800);
        cy.get('button[data-auth="logout"]').click();
        cy.get('.modal-footer button[data-auth="login"]').should("exist");
    });
});
