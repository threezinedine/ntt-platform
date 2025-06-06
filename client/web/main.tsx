import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Routes, HashRouter } from 'react-router';

import { Home, About, Login, Redirect, Blog, Register, Profile } from '@/pages';
import { Layout } from '@/shared';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<HashRouter>
		<Routes>
			<Route
				path='/'
				element={
					<Layout>
						<Home />
					</Layout>
				}
			/>
			<Route path='/home' element={<Redirect redirectTo='/' />} />
			<Route
				path='/about'
				element={
					<Layout>
						<About />
					</Layout>
				}
			/>
			<Route
				path='/blog'
				element={
					<Layout>
						<Blog />
					</Layout>
				}
			/>
			<Route
				path='/profile'
				element={
					<Layout isAuth>
						<Profile />
					</Layout>
				}
			/>
			<Route
				path='/login'
				element={
					<Layout>
						<Login />
					</Layout>
				}
			/>
			<Route
				path='/register'
				element={
					<Layout>
						<Register />
					</Layout>
				}
			/>
		</Routes>
	</HashRouter>,
);
