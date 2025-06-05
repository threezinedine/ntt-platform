import React from 'react';
import clsx from 'clsx';

const Logo: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
	return (
		<div
			onClick={onClick}
			className={clsx(
				'flex',
				'items-center',
				'cursor-pointer',
				'select-none',
			)}>
			<svg
				className={clsx(
					'h-8',
					'w-auto',
					'sm:h-10',
					'text-indigo-600',
					'dark:text-indigo-400',
					'transition-colors',
					'duration-300',
				)}
				viewBox='0 0 24 24'
				fill='currentColor'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M12 2L2 7L12 12L22 7L12 2Z'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M2 17L12 22L22 17'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M2 12L12 17L22 12'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
			<span
				className={clsx(
					'ml-3',
					'text-xl',
					'font-semibold',
					'text-slate-800',
					'dark:text-slate-200',
				)}>
				NTT Platform
			</span>
		</div>
	);
};

export default Logo;
