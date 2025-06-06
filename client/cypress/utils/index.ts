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

export const assertOnTopPage = () => {
	cy.wrap(window.scrollY).should('equal', 0);
};
