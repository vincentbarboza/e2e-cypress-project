import loginFixture from '../../../fixtures/Authentication/Login/LoginFixture';

const selectors = {
    userName: '[data-test="username"]',
    password: '[data-test="password"]',
    submitButton: '[data-test="login-button"]',
};

describe('Test file', () => {
    it('Test case', () => {
        cy.intercept('GET', '/').as('homePage');

        // Go to the home page
        cy.visit('/');

        // Login
        cy.get(selectors.userName).type(loginFixture.userName);
        cy.get(selectors.password).type(loginFixture.password);
        cy.get(selectors.submitButton).click();

        // Wait for the response
        cy.wait('@homePage').its('response.statusCode').should('eq', 200);
    });
});
