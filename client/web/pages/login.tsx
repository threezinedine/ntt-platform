import React from 'react';
import clsx from 'clsx';

import { LoginForm } from '@/features/authenticate';

const Login: React.FC = () => {
	return (
		<div
			className={clsx(
				'w-full',
				'max-w-md',
				'h-full',
				'mx-auto',
				'py-8',
				'select-none',
			)}>
			<div
				className={clsx(
					'bg-white',
					'dark:bg-slate-800',
					'shadow-2xl',
					'rounded-xl',
					'p-8',
					'sm:p-10',
					'transition-colors',
					'duration-300',
				)}>
				<div className={clsx('text-center', 'mb-8')}>
					<h1
						className={clsx(
							'text-3xl',
							'sm:text-4xl',
							'font-bold',
							'text-indigo-600',
							'dark:text-indigo-400',
							'mb-2',
						)}>
						Welcome Back!
					</h1>
					<p
						className={clsx(
							'text-sm',
							'text-slate-600',
							'dark:text-slate-300',
						)}>
						Please enter your credentials to login.
					</p>
				</div>

				<LoginForm />

				<p
					className={clsx(
						'mt-8',
						'text-center',
						'text-sm',
						'text-slate-600',
						'dark:text-slate-400',
					)}>
					Don't have an account?{' '}
					<a
						href='#register' // Replace with your actual registration page path
						className={clsx(
							'font-medium',
							'text-indigo-600',
							'hover:text-indigo-500',
							'dark:text-indigo-400',
							'dark:hover:text-indigo-300',
						)}>
						Register here{' '}
					</a>
				</p>
			</div>
			<p
				className={clsx(
					'mt-8',
					'text-center',
					'text-xs',
					'text-slate-500',
					'dark:text-slate-400',
				)}>
				&copy; {new Date().getFullYear()} Your Platform Name. All rights
				reserved.
			</p>
		</div>
	);
};

export default Login;
