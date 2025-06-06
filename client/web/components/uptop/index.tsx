import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export const UP_TOP_BOTTOM_SCROLL_Y_THRESHOLD = 100;

const UpTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		document.addEventListener('scroll', () => {
			if (window.scrollY > UP_TOP_BOTTOM_SCROLL_Y_THRESHOLD) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		});
	}, []);

	return (
		<div className={clsx('fixed', 'bottom-6', 'right-6')}>
			<button
				data-testid='uptop-button'
				onClick={handleScrollToTop}
				type='button'
				className={clsx(
					isVisible ? 'block' : 'hidden',
					'bg-indigo-600',
					'hover:bg-indigo-700',
					'focus:bg-indigo-500',
					'text-white',
					'w-12',
					'h-12',
					'flex',
					'items-center',
					'justify-center',
					'rounded-full',
					'shadow-md',
					'hover:shadow-lg',
					'focus:outline-none',
					'focus:ring-2',
					'focus:ring-indigo-300',
					'transition-transform',
					'transform',
					'hover:scale-110',
					'active:scale-95',
					'cursor-pointer',
				)}
				aria-label='Scroll to top'>
				<svg
					className='w-6 h-6'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M5 10l7-7m0 0l7 7m-7-7v18'
					/>
				</svg>
			</button>
		</div>
	);
};

export default UpTop;
