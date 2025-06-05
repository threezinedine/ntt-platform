import React, { useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import clsx from 'clsx';

import Toast from '@/components/toast';
import { useAuthContext } from '@/features/authenticate';
import { request } from '@/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { loggedIn, loggedOut } = useAuthContext();

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
				loggedOut();
			});
	}, []);

	return (
		<div>
			<Navbar />
			<div className={clsx('min-h-screen', 'bg-slate-700')}>
				{children}
			</div>
			<Footer />
			<Toast />
		</div>
	);
};

export default Layout;
