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

const Layout: React.FC<{ children: React.ReactNode; isAuth?: boolean }> = ({
	children,
	isAuth = false,
}) => {
	const navigator = useNavigate();
	const { loggedIn, loggedOut, isLoggedIn } = useAuthContext();
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
		const access_token = localStorage.getItem('access_token');
		const refresh_token = localStorage.getItem('refresh_token');

		if (access_token === null || refresh_token === null) {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			loggedOut();
		}

		// verify access token
		request
			.get('/user', {
				headers: {
					Authorization: access_token,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					loggedIn();
				} else {
					loggedOut();
				}
			})
			.catch((err) => {
				refreshTokenRequest({
					access_token,
					refresh_token,
				} as RefreshTokenRequest).then((res) => {
					if (res.status === 200) {
						loggedIn();
						localStorage.setItem(
							'access_token',
							res.data.access_token,
						);
					} else {
						loggedOut();
					}
				});
				loggedOut();
			});
	}, []);

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
