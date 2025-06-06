/// <reference types="cypress" />
import { visit, assertUrl, assertOnTopPage } from '../utils';
import { WAIT_TIME_FOR_SCROLL } from '../data';

const SCROLL_TO_Y = 100;
const SCROLL_TO_X = 0;

describe('Navigate', () => {
	it('should navigate to the home page', () => {
		visit('');
		cy.window()
			.then((win) => {
				win.scrollTo(SCROLL_TO_X, SCROLL_TO_Y);
			})
			.then(() => {
				cy.get('[data-testid="navlink-Home"]').click();
				assertUrl('');

				cy.wait(WAIT_TIME_FOR_SCROLL).then(() => {
					assertOnTopPage();
				});
			});
	});

	it('should navigate to the about page and scroll to the page', () => {
		visit('');
		cy.window()
			.then((win) => {
				win.scrollTo(SCROLL_TO_X, SCROLL_TO_Y);
			})
			.then(() => {
				cy.get('[data-testid="navlink-About"]').click();
				assertUrl('about');

				cy.wait(WAIT_TIME_FOR_SCROLL).then(() => {
					assertOnTopPage();
				});
			});
	});

	it('should navigate to the blog page and scroll to the page', () => {
		visit('');
		cy.window()
			.then((win) => {
				win.scrollTo(SCROLL_TO_X, SCROLL_TO_Y);
			})
			.then(() => {
				cy.get('[data-testid="navlink-Blog"]').click();
				assertUrl('blog');

				cy.wait(WAIT_TIME_FOR_SCROLL).then(() => {
					assertOnTopPage();
				});
			});
	});

	it('should navigate to the login page and scroll to the top', () => {
		visit('');
		cy.window()
			.then((win) => {
				win.scrollTo(SCROLL_TO_X, SCROLL_TO_Y);
			})
			.then(() => {
				cy.get('[data-testid="navlink-Login"]').click();
				assertUrl('login');

				cy.wait(WAIT_TIME_FOR_SCROLL).then(() => {
					assertOnTopPage();
				});
			});
	});

	it('should navigate to the register page and scroll to the top', () => {
		visit('');
		cy.window()
			.then((win) => {
				win.scrollTo(SCROLL_TO_X, SCROLL_TO_Y);
			})
			.then(() => {
				cy.get('[data-testid="navlink-Register"]').click();
				assertUrl('register');

				cy.wait(WAIT_TIME_FOR_SCROLL).then(() => {
					assertOnTopPage();
				});
			});
	});

	it('should navigate to the register page and scroll to the top when click on register link', () => {
		visit('login');

		cy.window()
			.then((win) => {
				win.scrollTo(SCROLL_TO_X, SCROLL_TO_Y);
			})
			.then(() => {
				cy.get('[data-testid="form-register-link"]').click();
				assertUrl('register');

				cy.wait(WAIT_TIME_FOR_SCROLL).then(() => {
					assertOnTopPage();
				});
			});
	});

	it('should navigate to the login page and scroll to the top when click on login link', () => {
		visit('register');

		cy.window()
			.then((win) => {
				win.scrollTo(SCROLL_TO_X, SCROLL_TO_Y);
			})
			.then(() => {
				cy.get('[data-testid="form-login-link"]').click();
				assertUrl('login');

				cy.wait(WAIT_TIME_FOR_SCROLL).then(() => {
					assertOnTopPage();
				});
			});
	});

	it('should show the uptop button when needed', () => {
		visit('');
		cy.get('[data-testid="uptop-button"]').should('not.exist');

		cy.window()
			.then((win) => {
				win.scrollTo(SCROLL_TO_X, 30);
			})
			.then(() => {
				cy.get('[data-testid="uptop-button"]').should('not.exist');
			});
	});
});
