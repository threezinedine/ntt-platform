/// <reference types="cypress" />

import { assertUrl, visit } from '../utils';

describe('Authentication', () => {
	it('open the login page', () => {
		visit('login');
		assertUrl('login');
	});

	it('should navigate to the / if the /home is visited', () => {
		visit('home');
		assertUrl('');
	});

	it('should not navigate to the login page at home page', () => {
		visit('');
		cy.wait(1000);
		assertUrl('');
	});

	it('should navigate to the login page for /profile page', () => {
		visit('profile');
		assertUrl('login');
	});

	it('should navigate to the login page for /profile page', () => {
		visit('profile');
		assertUrl('login');
	});

	it('should show the navlinks for home, about, blog in home page', () => {
		visit('');
		cy.get('[data-testid="navlinks-container"]').should('exist');
	});

	it('should not show the navlinks for home, about, blog in login page', () => {
		visit('login');
		cy.get('[data-testid="navlinks-container"]').should('not.exist');
	});
});
