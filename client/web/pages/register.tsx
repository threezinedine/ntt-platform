import React from 'react';
import clsx from 'clsx';

import { LoginForm, RegisterForm } from '@/features/authenticate';

const Register: React.FC = () => {
	return (
		<div
			className={clsx(
				'w-full',
				'max-w-md',
				'h-full',
				'mx-auto',
				'py-8',
				'select-none',
				'flex',
				'flex-col',
				'items-center',
				'justify-center',
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
					'min-w-[500px]',
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
						Create an Account
					</h1>
					<p
						className={clsx(
							'text-sm',
							'text-slate-600',
							'dark:text-slate-300',
						)}>
						Please enter your details to create an account.
					</p>
				</div>

				<RegisterForm />

				<p
					className={clsx(
						'mt-8',
						'text-center',
						'text-sm',
						'text-slate-600',
						'dark:text-slate-400',
					)}>
					Already have an account?{' '}
					<a
						href='#login' // Replace with your actual registration page path
						onClick={() => {
							window.scrollTo({
								top: 0,
								behavior: 'smooth',
							});
						}}
						className={clsx(
							'font-medium',
							'text-indigo-600',
							'hover:text-indigo-500',
							'dark:text-indigo-400',
							'dark:hover:text-indigo-300',
						)}>
						Login here{' '}
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

export default Register;
