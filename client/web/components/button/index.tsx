import React from 'react';
import ButtonProps from './props';
import { Color, Size, Rounded } from '@/common';
import clsx from 'clsx';

const Button: React.FC<ButtonProps> = ({
	children,
	color = Color.Primary,
	size = Size.Medium,
	rounded = Rounded.Round,
	disabled = false,
	loading = false,
	outline = false,
	leadingIcon = '',
	trailingIcon = '',
	onClick,
	...props
}) => {
	const colorClassCommon = clsx(
		!outline && clsx('transition-colors', 'focus-visible:ring-offset-2'),
		outline &&
			clsx(
				'border',
				'bg-transparent',
				'disabled:bg-transparent',
				'disabled:opacity-60',
				'transition-all',
				'ease-in-out',
			),
		'font-semibold',
		'focus:outline-none',
		'focus-visible:ring-2',
		'disabled:cursor-not-allowed',
		'duration-150',
		'cursor-pointer',
	);

	const iconClassCommon = clsx('flex', 'items-center', 'justify-center');

	let colorClass: string = '';

	if (outline) {
		switch (color) {
			case Color.Primary:
				colorClass = clsx(
					'text-sky-600',
					'border-sky-500',
					'dark:text-sky-400',
					'dark:border-sky-400',
					'hover:bg-sky-50',
					'hover:text-sky-700',
					'hover:border-sky-600',
					'dark:hover:bg-sky-400/10',
					'dark:hover:text-sky-300',
					'dark:hover:border-sky-300',
					'focus-visible:ring-sky-500',
					'dark:focus-visible:ring-sky-400',
					'disabled:text-sky-400',
					'disabled:border-sky-400',
					'dark:disabled:text-sky-600',
					'dark:disabled:border-sky-600',
				);
				break;
			case Color.Secondary:
				colorClass = clsx(
					'text-slate-600',
					'border-slate-500',
					'dark:text-slate-400',
					'dark:border-slate-400',
					'hover:bg-slate-50',
					'hover:text-slate-700',
					'hover:border-slate-600',
					'dark:hover:bg-slate-500/10',
					'dark:hover:text-slate-300',
					'dark:hover:border-slate-300',
					'focus-visible:ring-slate-500',
					'dark:focus-visible:ring-slate-400',
					'disabled:text-slate-400',
					'disabled:border-slate-400',
					'dark:disabled:text-slate-500',
					'dark:disabled:border-slate-500',
				);
				break;
			case Color.Success:
				colorClass = clsx(
					'text-green-600',
					'border-green-500',
					'dark:text-green-400',
					'dark:border-green-400',
					'hover:bg-green-50',
					'hover:text-green-700',
					'hover:border-green-600',
					'dark:hover:bg-green-400/10',
					'dark:hover:text-green-300',
					'dark:hover:border-green-300',
					'focus-visible:ring-green-500',
					'dark:focus-visible:ring-green-400',
					'disabled:text-green-400',
					'disabled:border-green-400',
					'dark:disabled:text-green-600',
					'dark:disabled:border-green-600',
				);
				break;
			case Color.Warning:
				colorClass = clsx(
					'text-yellow-600',
					'border-yellow-500',
					'dark:text-yellow-400',
					'dark:border-yellow-400',
					'hover:bg-yellow-50',
					'hover:text-yellow-700',
					'hover:border-yellow-600',
					'dark:hover:bg-yellow-400/10',
					'dark:hover:text-yellow-300',
					'dark:hover:border-yellow-300',
					'focus-visible:ring-yellow-500',
					'dark:focus-visible:ring-yellow-400',
					'disabled:text-yellow-400',
					'disabled:border-yellow-400',
					'dark:disabled:text-yellow-600',
					'dark:disabled:border-yellow-600',
				);
				break;
			case Color.Error:
				colorClass = clsx(
					'text-red-600',
					'border-red-500',
					'dark:text-red-400',
					'dark:border-red-400',
					'hover:bg-red-50',
					'hover:text-red-700',
					'hover:border-red-600',
					'dark:hover:bg-red-400/10',
					'dark:hover:text-red-300',
					'dark:hover:border-red-300',
					'focus-visible:ring-red-500',
					'dark:focus-visible:ring-red-400',
					'disabled:text-red-400',
					'disabled:border-red-400',
					'dark:disabled:text-red-600',
					'dark:disabled:border-red-600',
				);
				break;
			default:
				colorClass = clsx();
		}
	} else {
		switch (color) {
			case Color.Primary:
				colorClass = clsx(
					'bg-sky-500',
					'text-white',
					'hover:bg-sky-600',
					'active:bg-sky-700',
					'focus-visible:ring-sky-500',
					'focus-visible:ring-offset-white',
					'dark:focus-visible:ring-offset-slate-900',
					'disabled:bg-sky-300/70',
					'dark:disabled:bg-sky-800/60',
					'disabled:text-sky-100/70',
					'dark:disabled:text-sky-400/60',
					'disabled:hover:bg-sky-300/70',
					'dark:disabled:hover:bg-sky-800/60',
				);
				break;
			case Color.Secondary:
				colorClass = clsx(
					'bg-slate-500',
					'text-white',
					'hover:bg-slate-600',
					'active:bg-slate-700',
					'focus-visible:ring-slate-500',
					'focus-visible:ring-offset-white',
					'dark:focus-visible:ring-offset-slate-900',
					'disabled:bg-slate-300/70',
					'dark:disabled:bg-slate-700/60',
					'disabled:text-slate-100/70',
					'dark:disabled:text-slate-400/60',
					'disabled:hover:bg-slate-300/70',
					'dark:disabled:hover:bg-slate-700/60',
				);
				break;
			case Color.Success:
				colorClass = clsx(
					'bg-green-500',
					'text-white',
					'hover:bg-green-600',
					'active:bg-green-700',
					'focus-visible:ring-green-500',
					'focus-visible:ring-offset-white',
					'dark:focus-visible:300/70',
					'dark:disabled:bg-green-800/60',
					'disabled:text-green-100/70',
					'dark:disabled:text-green-400/60',
					'disabled:cursor-not-allowed',
					'disabled:hover:bg-green-300/70',
					'dark:disabled:hoverring-offset-slate-900',
				);
				break;
			case Color.Warning:
				colorClass = clsx(
					'bg-yellow-500',
					'text-white',
					'hover:bg-yellow-600',
					'active:bg-yellow-700',
					'focus-visible:ring-yellow-500',
					'disabled:bg-yellow-300/70',
					'dark:disabled:bg-yellow-800/60',
					'disabled:text-yellow-100/70',
					'dark:disabled:text-yellow-400/60',
					'disabled:cursor-not-allowed',
					'disabled:hover:bg-yellow-300/70',
					'dark:disabled:hover:bg-yellow-800/60',
				);
				break;
			case Color.Error:
				colorClass = clsx(
					'bg-red-500',
					'text-white',
					'hover:bg-red-600',
					'active:bg-red-700',
					'focus-visible:ring-red-500',
					'focus-visible:ring-offset-white',
					'dark:focus-v-red-300/70',
					'dark:disabled:bg-red-800/60',
					'disabled:text-red-100/70',
					'dark:disabled:text-red-400/60',
					'disabled:cursor-not-allowed',
					'disabled:hover:bg-red-300/70',
					'dark:disableisible:ring-offset-slate-900',
				);
				break;
			default:
				colorClass = clsx();
		}
	}

	let sizeClass: string = '';
	switch (size) {
		case Size.Small:
			sizeClass = clsx('py-1', 'px-3', 'text-sm');
			break;
		case Size.Medium:
			sizeClass = clsx('py-2', 'px-4', 'text-base');
			break;
		case Size.Large:
			sizeClass = clsx('py-3', 'px-6', 'text-lg');
			break;
		case Size.SuperLarge:
			sizeClass = clsx('py-4', 'px-8', 'text-xl');
			break;
		case Size.FullWidth:
			sizeClass = clsx('w-full', 'py-2', 'px-4', 'text-base');
			break;
		default:
			sizeClass = '';
	}

	const roundedClassCommon = clsx();
	let roundedClass = '';

	switch (rounded) {
		case Rounded.Sharp:
			roundedClass = clsx('rounded-none');
			break;
		case Rounded.Round:
			roundedClass = clsx('rounded-md');
			break;
		case Rounded.Pill:
			roundedClass = clsx('rounded-full');
			break;
		default:
			roundedClass = '';
	}

	const loadingClass = clsx('flex', 'items-center', 'justify-center');

	function handleClick() {
		if (loading) return;
		if (disabled) return;

		if (onClick) onClick();
	}

	return (
		<button
			className={clsx(
				'relative',
				colorClass,
				sizeClass,
				colorClassCommon,
				roundedClassCommon,
				roundedClass,
				loading && loadingClass,
				leadingIcon !== '' && iconClassCommon,
				trailingIcon !== '' && iconClassCommon,
			)}
			disabled={disabled || loading}
			onClick={handleClick}
			{...props}>
			{loading && (
				<div
					className={clsx(
						'absolute',
						'top-0',
						'left-0',
						'right-0',
						'bottom-0',
						'w-full',
						'h-full',
						'flex',
						'items-center',
						'justify-center',
					)}>
					<svg
						className='animate-spin h-5 w-5 text-white'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							stroke-width='4'></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
					</svg>
				</div>
			)}
			{leadingIcon !== '' && (
				<span className={clsx('mr-2')}>
					<i className={leadingIcon}></i>
				</span>
			)}
			{children}
			{trailingIcon !== '' && (
				<span className={clsx('ml-2')}>
					<i className={trailingIcon}></i>
				</span>
			)}
		</button>
	);
};

export default Button;
