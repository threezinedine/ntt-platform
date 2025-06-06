import React from 'react';
import useToastContext from './toastContext';
import clsx from 'clsx';

const Toast: React.FC = () => {
	const { messages, removeToast } = useToastContext();

	const getIcon = (type: string) => {
		switch (type) {
			case 'success':
				return 'fa-solid fa-check-circle text-green-500';
			case 'error':
				return 'fa-solid fa-xmark-circle text-red-500';
			case 'warning':
				return 'fa-solid fa-exclamation-triangle text-yellow-500';
			case 'info':
				return 'fa-solid fa-info-circle text-blue-500';
			default:
				return 'fa-solid fa-info-circle text-blue-500';
		}
	};

	const getBgColor = (type: string) => {
		switch (type) {
			case 'success':
				return 'bg-green-100';
			case 'error':
				return 'bg-red-100';
			case 'warning':
				return 'bg-yellow-100';
			case 'info':
				return 'bg-blue-100';
			default:
				return 'bg-blue-100';
		}
	};

	return (
		<div
			className={clsx(
				'fixed',
				'select-none',
				'bottom-4',
				'left-4',
				'space-y-3',
				'min-w-80',
			)}
			aria-live='polite'
			aria-atomic='true'>
			{messages.map((message, index) => (
				<div key={index} className={`toast ${message.type}`}>
					<div
						className={clsx(
							'flex',
							'items-center',
							'justify-between',
							'w-full',
							'max-w-sm',
							'px-4',
							'py-2',
							'mb-3',
							'rounded-lg',
							'shadow-md',
							'transition-transform',
							'transform',
							'scale-100',
							'hover:scale-105',
							getBgColor(message.type),
						)}
						role='alert'>
						<div className={clsx('flex', 'items-center')}>
							<span
								className={clsx('mr-3', 'rounded-full', 'p-3')}>
								<i className={clsx(getIcon(message.type))}></i>
							</span>
							<span className={clsx('text-sm', 'text-gray-700')}>
								{message.message}
							</span>
						</div>
						<div
							className={clsx(
								'text-gray-500',
								'hover:text-gray-700',
								'focus:outline-none',
								'cursor-pointer',
							)}
							onClick={() => removeToast(message)}
							aria-label='Close Toast'>
							<i className={clsx('fa-solid', 'fa-xmark')}></i>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Toast;
export { useToastContext };
