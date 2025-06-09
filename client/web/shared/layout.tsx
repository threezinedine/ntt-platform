import React, { useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import clsx from 'clsx';
import { useNavigate } from 'react-router';

import Toast, { useToastContext } from '@/components/toast';
import {
	refreshTokenRequest,
	useAuthContext,
	RefreshTokenRequest,
} from '@/features/authenticate';
import { request } from '@/utils';
import UpTop from '@/components/uptop';
import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
} from '@/features/authenticate/data/constants';

const Layout: React.FC<{ children: React.ReactNode; isAuth?: boolean }> = ({
	children,
	isAuth = false,
}) => {
	const navigator = useNavigate();
	const {
		loggedIn,
		loggedOut,
		isLoggedIn,
		shouldRefreshToken,
		cleanRefreshToken,
		refreshToken,
	} = useAuthContext();
	const addToast = useToastContext((state) => state.addToast);

	const validateAuth = () => {
		if (!isAuth) {
			return;
		}

		if (!isLoggedIn) {
			addToast({
				message: 'You are not authorized to access this page',
				type: 'error',
				duration: 3000,
			});
			navigator('/login');
		}
	};

	useEffect(() => {
		refreshToken();
	}, []);

	useEffect(() => {
		if (!shouldRefreshToken) {
			return;
		}

		const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

		if (accessToken === null || refreshToken === null) {
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			loggedOut();
			return;
		}

		// verify access token
		request
			.get('/v1/auth/user', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					loggedIn();
				} else {
					refreshTokenRequest({
						accessToken: accessToken,
						refreshToken: refreshToken,
					} as RefreshTokenRequest).then((res) => {
						if (res.status === 200) {
							loggedIn();
							localStorage.setItem(
								ACCESS_TOKEN_KEY,
								res.data.accessToken,
							);
						} else {
							loggedOut();
						}
					});
					loggedOut();
				}
			})
			.catch((err) => {
				refreshTokenRequest({
					accessToken: accessToken,
					refreshToken: refreshToken,
				} as RefreshTokenRequest).then((res) => {
					if (res.status === 200) {
						loggedIn();
						localStorage.setItem(
							ACCESS_TOKEN_KEY,
							res.data.accessToken,
						);
					} else {
						loggedOut();
					}
				});
				loggedOut();
			})
			.finally(() => {
				cleanRefreshToken();
			});
	}, [shouldRefreshToken]);

	useEffect(() => {
		validateAuth();
	}, [isLoggedIn]);

	return (
		<div>
			<Navbar />
			<div className={clsx('min-h-screen', 'bg-slate-700')}>
				{children}
			</div>
			<Footer />
			<Toast />
			<UpTop />
		</div>
	);
};

export default Layout;
