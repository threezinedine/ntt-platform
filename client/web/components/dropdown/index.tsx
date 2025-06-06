import React, { useRef, useState } from 'react';
import { DropdownProps, DropdownItemProps } from './props';
import clsx from 'clsx';

const DropdownSeparator = () => {
	return (
		<div
			className={clsx('my-1', 'h-px', 'bg-gray-200', 'dark:bg-gray-700')}
			role='separator'></div>
	);
};

const Dropdown: React.FC<DropdownProps> = ({ itemMap, trigger }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const baseLayoutClasses = clsx(
		'flex',
		'items-center',
		'px-4',
		'py-2',
		'text-sm',
		'cursor-pointer',
		'transition-colors',
		'duration-150',
		'rounded-md',
	);

	const defaultTextClasses = clsx('text-gray-800', 'dark:text-gray-200');

	const specialItemSpecificClasses = clsx(
		'text-red-500',
		'dark:text-red-500',
		'font-semibold',
	);

	const hoverClasses = clsx(
		'hover:bg-purple-600',
		'dark:hover:bg-purple-600',
		'hover:text-white',
		'dark:hover:text-white',
	);

	const clickOutsideEvent = (e: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(e.target as Node)
		) {
			setIsOpen(false);
		}

		return () => {
			document.removeEventListener('click', clickOutsideEvent);
		};
	};

	const handleTriggerClick = () => {
		setIsOpen(!isOpen);

		document.addEventListener('click', clickOutsideEvent);
	};

	return (
		<div
			className={clsx('relative', 'inline-block', 'text-left')}
			ref={dropdownRef}>
			<div onClick={handleTriggerClick}>{trigger}</div>

			{isOpen && (
				<div
					className={clsx(
						'origin-top-right',
						'absolute',
						'right-0',
						'mt-2',
						'w-64',
						'rounded-md',
						'shadow-lg',
						'bg-card',
						'dark:bg-card',
						'ring-1',
						'ring-black',
						'ring-opacity-5',
						'focus:outline-none',
						'z-50',
						'p-1',
						'bg-gray-100',
						'dark:bg-gray-800',
					)}
					id='options-menu'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='options-menu-button'>
					{itemMap.map((itemList, index) => {
						return (
							<div key={index}>
								<div>
									{itemList.map((item, itemIndex) => {
										let currentItemTextClasses =
											defaultTextClasses;
										if (item.special) {
											currentItemTextClasses =
												specialItemSpecificClasses;
										}

										const handleClick = () => {
											if (item.onClick) {
												item.onClick();
											}

											if (item.closeOnClick) {
												setIsOpen(false);
												document.removeEventListener(
													'click',
													clickOutsideEvent,
												);
											}
										};

										return (
											<div
												key={itemIndex}
												data-testid={`dropdown-item-${item.label.toLowerCase()}`}
												onClick={handleClick}
												className={clsx(
													baseLayoutClasses,
													currentItemTextClasses,
													hoverClasses,
												)}
												role='menuitem'
												tabIndex={-1}>
												<i
													className={clsx(
														item.icon,
														'mr-2',
													)}></i>
												<span
													className={clsx(
														'flex-grow',
														'truncate',
													)}>
													{item.label}
												</span>
												{item.newFeature && (
													<span
														className={clsx(
															'ml-auto',
															'px-2',
															'py-0.5',
															'text-xs',
															'font-semibold',
															'bg-accent',
															'text-accent-foreground',
															'rounded-full',
															'shrink-0',
														)}>
														NEW
													</span>
												)}
											</div>
										);
									})}
								</div>
								{index !== itemMap.length - 1 && (
									<DropdownSeparator />
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
