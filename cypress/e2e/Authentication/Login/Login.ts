import loginFixture from '../../../fixtures/Authentication/Login/LoginData';

const selectors = {
    userName: '[data-test="username"]',
    password: '[data-test="password"]',
    submitButton: '[data-test="login-button"]',
};

describe('Login', () => {
    it('Check the login flow', () => {
        cy.intercept('GET', '/').as('homePage');

        // Go to the home page
        cy.visit('/');

        // Login
        cy.get(selectors.userName).type(loginFixture.userName);
        cy.get(selectors.password).type(loginFixture.password);
        cy.get(selectors.submitButton).click();

        // Wait for the response
        cy.wait('@homePage').its('response.statusCode').should('eq', 200);

        // Check the right URL
        cy.url().should('contain', 'inventory');
    });
});
