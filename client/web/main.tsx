import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router';
import Home from '@/pages/home';
import About from '@/pages/about';
import Redirect from './pages/redirect';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<HashRouter>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/about' element={<About />} />
			<Route path='/home' element={<Redirect redirectTo='/' />} />
		</Routes>
	</HashRouter>,
);
