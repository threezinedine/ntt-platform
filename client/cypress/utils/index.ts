/// <reference types="cypress" />

export const visit = (path: string) => {
	cy.fixture('configure.json').then((config) => {
		cy.visit(`${config.baseUrl}${path}`);
	});
};

export const assertUrl = (path: string) => {
	cy.fixture('configure.json').then((config) => {
		cy.url().should('equal', `${config.baseUrl}${path}`);
	});
};

export const login = (): Cypress.Chainable<void> => {
	return cy.fixture('authentication.json').then((data) => {
		cy.get('[data-testid="username"]').type(data.username);
		cy.get('[data-testid="password"]').type(data.password);
		cy.get('[data-testid="submit"]').click();
	});
};

export const assertOnTopPage = () => {
	cy.wrap(window.scrollY).should('equal', 0);
};

export const assertToastMessage = (
	type: 'success' | 'error' | 'info' | 'warning',
) => {
	cy.get(`[data-testid="toast-message-${type}"]`).should('exist');
};
