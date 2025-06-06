import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import Button from '@/components/button';
import { Color } from '@/common';
import Logo from './logo';
import { useAuthContext } from '@/features/authenticate';
import Dropdown from '@/components/dropdown';

const NavLinkItem: React.FC<{
	testId: string;
	href: string;
	children: React.ReactNode;
	icon?: string;
	onClick?: () => void;
	isActive: boolean;
}> = ({ href, children, icon = '', isActive, onClick = () => {}, testId }) => {
	const navigator = useNavigate();

	const handleClick = () => {
		if (onClick) onClick();

		navigator(href);

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div
			data-testid={testId}
			onClick={handleClick}
			className={clsx(
				'flex',
				'items-center',
				'px-3',
				'py-2',
				'rounded-md',
				'cursor-pointer',
				'gap-1',
				'text-sm',
				'font-medium',
				'transition-all',
				'duration-200',
				'ease-in-out',
				'focus:outline-none',
				'focus:ring-2',
				'focus:ring-indigo-500',
				'focus:ring-offset-2',
				'dark:focus:ring-offset-slate-900',
				isActive &&
					clsx(
						'bg-indigo-100',
						'dark:bg-indigo-700',
						'text-indigo-700',
						'dark:text-indigo-100',
						'shadow-sm',
					),
				!isActive &&
					clsx(
						'text-slate-600',
						'dark:text-slate-300',
						'hover:bg-slate-100',
						'dark:hover:bg-slate-700',
						'hover:text-slate-900',
						'dark:hover:text-slate-50',
					),
			)}>
			{icon !== '' && <i className={icon}></i>}
			{children}
		</div>
	);
};

const UserAvatar = () => (
	<div
		className={clsx(
			'flex',
			'items-center',
			'justify-center',
			'h-10',
			'w-10',
			'rounded-full',
			'bg-indigo-500',
			'dark:bg-indigo-600',
			'text-white',
			'text-lg',
			'font-semibold',
			'shadow-md',
			'hover:scale-105',
			'transition-transform',
			'duration-200',
			'cursor-pointer',
		)}>
		{/* <UserCircle size={24} /> */}
	</div>
);

const Navbar: React.FC = () => {
	const navigator = useNavigate();
	const { isLoggedIn, loggedOut } = useAuthContext();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navLinks = [
		{ name: 'Home', href: '/', icon: 'fa-solid fa-house' },
		{ name: 'About', href: '/about', icon: 'fa-solid fa-info' },
		{ name: 'Blog', href: '/blog', icon: 'fa-solid fa-blog' },
	];

	return (
		<nav
			className={clsx(
				'select-none',
				'bg-white',
				'dark:bg-slate-800',
				'shadow-md',
				'sticky',
				'top-0',
				'z-50',
				'transition-colors',
				'duration-300',
			)}>
			<div
				className={clsx(
					'max-w-7xl',
					'mx-auto',
					'px-4',
					'sm:px-6',
					'lg:px-8',
				)}>
				<div
					className={clsx(
						'flex',
						'items-center',
						'justify-between',
						'h-16',
					)}>
					{/* Left Section: Logo */}
					<div className={clsx('flex-shrink-0')}>
						<Logo
							onClick={() => {
								navigator('/');
								window.scrollTo({
									top: 0,
									behavior: 'smooth',
								});
							}}
						/>
					</div>

					{/* Middle Section: Navigation Links (Desktop) */}
					<div
						data-testid='navlinks-container'
						className={clsx(
							'hidden',
							window.location.hash.substring(1) !== '/login' &&
								window.location.hash.substring(1) !==
									'/register' &&
								clsx('md:flex', 'md:ml-10', 'md:space-x-4'),
						)}>
						{navLinks.map((link) => (
							<NavLinkItem
								testId={`navlink-${link.name}`}
								key={link.name}
								href={link.href}
								icon={link.icon}
								isActive={
									window.location.hash.substring(1) ===
									link.href
								}>
								{link.name}
							</NavLinkItem>
						))}
					</div>

					{/* Right Section: Auth Buttons or User Avatar (Desktop) */}
					<div className='hidden md:flex items-center space-x-3'>
						{isLoggedIn ? (
							<div className='relative group'>
								<Dropdown
									trigger={<UserAvatar />}
									itemMap={[
										[
											{
												label: 'Profile',
												icon: 'fa-solid fa-user',
												closeOnClick: true,
												onClick: () => {
													navigator('/profile');
													window.scrollTo({
														top: 0,
														behavior: 'smooth',
													});
												},
											},
										],
										[
											{
												label: 'Logout',
												icon: 'fa-solid fa-right-from-bracket',
												special: true,
												onClick: () => {
													loggedOut();
													localStorage.removeItem(
														'access_token',
													);
													localStorage.removeItem(
														'refresh_token',
													);
													navigator('/login');
													window.scrollTo({
														top: 0,
														behavior: 'smooth',
													});
												},
											},
										],
									]}
								/>
							</div>
						) : (
							<>
								<Button
									testId='navlink-Login'
									color={Color.Primary}
									outline
									onClick={() => {
										navigator('/login');
										window.scrollTo({
											top: 0,
											behavior: 'smooth',
										});
									}}>
									Login
								</Button>
								<Button
									testId='navlink-Register'
									color={Color.Secondary}
									outline
									onClick={() => {
										navigator('/register');
										window.scrollTo({
											top: 0,
											behavior: 'smooth',
										});
									}}>
									Register
								</Button>
							</>
						)}
					</div>

					{/* Mobile Menu Button */}
					<div className='md:hidden flex items-center'>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200'
							aria-expanded={mobileMenuOpen}>
							{/* <span className='sr-only'>Open main menu</span>
							{mobileMenuOpen ? (
								<X
									className='block h-6 w-6'
									aria-hidden='true'
								/>
							) : (
								<Menu
									className='block h-6 w-6'
									aria-hidden='true'
								/>
							)} */}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Panel */}
			{mobileMenuOpen && (
				<div className='md:hidden absolute top-16 inset-x-0 bg-white dark:bg-slate-800 shadow-lg p-4 border-t border-slate-200 dark:border-slate-700'>
					<div className='space-y-2'>
						{navLinks.map((link) => (
							<NavLinkItem
								testId={`navlink-${link.name}`}
								key={link.name}
								href={link.href}
								icon={link.icon}
								isActive={
									window.location.hash.substring(1) ===
									link.href
								}
								onClick={() => {
									setMobileMenuOpen(false);
								}}>
								{link.name}
							</NavLinkItem>
						))}
					</div>
					<div className='mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3'>
						{isLoggedIn ? (
							<div className='flex items-center space-x-3'>
								<Dropdown
									trigger={<UserAvatar />}
									itemMap={[
										[
											{
												label: 'Profile',
												icon: 'fa-solid fa-user',
											},
										],
										[
											{
												label: 'Logout',
												icon: 'fa-solid fa-right-from-bracket',
												special: true,
											},
										],
									]}
								/>

								{/* <button
									onClick={() => {
										handleLogout();
										setMobileMenuOpen(false);
									}}
									className={`${secondaryButtonStyles} w-full flex items-center justify-center`}>
									Logout
								</button> */}
							</div>
						) : (
							<>
								{/* <button
									// onClick={() => {
									// 	handleLogin();
									// 	setMobileMenuOpen(false);
									// }}
									// className={`${secondaryButtonStyles} w-full flex items-center justify-center`}>
									// <LogIn size={16} className='inline mr-1' />{' '}
									Login
								</button> */}
								{/* <button
									onClick={() => {
										handleRegister();
										setMobileMenuOpen(false);
									}}
									className={`${primaryButtonStyles} w-full flex items-center justify-center`}>
									<UserPlus
										size={16}
										className='inline mr-1'
									/>{' '}
									Register
								</button> */}
							</>
						)}
					</div>
					{/* Toggle Logged In State (for demonstration) */}
					<div className='mt-6 pt-4 border-t border-slate-200 dark:border-slate-700'>
						<button className='w-full px-4 py-2 text-sm font-medium rounded-md bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors duration-200'>
							Toggle Login State (Demo)
						</button>
					</div>
				</div>
			)}
			{/* Demo Toggle Button outside navbar for easier testing */}
			<div className='fixed bottom-4 right-4 z-50 md:hidden'>
				<button className='px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200 text-sm'>
					Toggle Login (Demo)
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
