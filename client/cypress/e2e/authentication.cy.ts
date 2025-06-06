/// <reference types="cypress" />

import {
	assertOnTopPage,
	assertToastMessage,
	assertUrl,
	login,
	visit,
} from '../utils';
import { WAIT_TIME_FOR_SCROLL } from '../data';

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
		assertToastMessage('error');
	});

	it('should show the navlinks for home, about, blog in home page', () => {
		visit('');
		cy.get('[data-testid="navlinks-container"]').should('exist');
	});

	it('should not show the navlinks for home, about, blog in login page', () => {
		visit('login');
		cy.get('[data-testid="navlinks-container"]').should('not.exist');
	});

	it('should navigate to the home page after login successfully', () => {
		cy.fixture('authentication.json').then((data) => {
			visit('login');
			cy.get('[data-testid="username"]').type(data.username);
			cy.get('[data-testid="password"]').type(data.password);
			cy.get('[data-testid="submit"]').click();
			assertUrl('');
			assertToastMessage('success');

			cy.wait(WAIT_TIME_FOR_SCROLL)
				.then(() => {
					assertOnTopPage();
				})
				.then(() => {
					visit('profile');

					cy.wait(100).then(() => {
						assertUrl('profile');
					});
				});
		});
	});

	it('should move to the login page when click on the logout button', () => {
		visit('login');
		login().then(() => {
			cy.get('[data-testid="avatar"]').click();
			cy.get('[data-testid="dropdown-item-logout"]').click();
			assertUrl('login');

			cy.wait(WAIT_TIME_FOR_SCROLL)
				.then(() => {
					assertOnTopPage();
				})
				.then(() => {
					visit('profile');
					cy.reload();

					cy.wait(100).then(() => {
						assertUrl('login');
						assertToastMessage('error');
					});
				});
		});
	});
});
