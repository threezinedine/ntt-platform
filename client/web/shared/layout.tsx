import React from 'react';
import Navbar from './navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div>
			<Navbar />
			<div>{children}</div>
		</div>
	);
};

export default Layout;
