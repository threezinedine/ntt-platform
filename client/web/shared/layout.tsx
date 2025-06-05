import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import clsx from 'clsx';

import Toast from '@/components/toast';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
