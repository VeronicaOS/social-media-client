describe("loginSuccessful", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/");
        cy.wait(800);
    });
    it("can login a user with a valid credentials and stores a token in local storage", () => {
        cy.get("#registerForm").find("button[data-auth=login]").click();
        cy.get("#loginForm").should("be.visible");
        cy.wait(600);
        cy.get("#loginForm")
            .find('input[name="email"]')
            .type("test4321@stud.noroff.no");
        cy.get("#loginForm")
            .find('input[name="password"]')
            .type("4321test1234");
        cy.get("#loginForm").find("button[type=submit]").click();
        cy.wait(1000);
        cy.window().its("localStorage.profile").should("exist");
    });
});

describe("unsuccessfulLogin", () => {
    it("Alerts a message for login attempts with invalid login information", () => {
        cy.visit("http://127.0.0.1:5500/");
        cy.wait(800);
        cy.get('.modal-footer button[data-auth="login"]').click();
        cy.get("#loginEmail").invoke("val", "wrongemail@test.no");
        cy.get("#loginPassword").invoke("val", "wrongemail1");
        cy.wait(800);
        cy.get("#loginForm button").contains("Login").click();
        cy.wait(800);
        cy.on("window:alert", (text) => {
            expect(text).to.contains(
                "Your username and/or password is incorrect"
            );
        });
    });
});
