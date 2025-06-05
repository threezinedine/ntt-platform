import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import FormProps, { FormData } from './props';
import Button from '@/components/button';
import { Size } from '@/common';

type Errors = { [key: string]: string | null };

// --- DynamicForm Component ---
const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
	const [formData, setFormData] = useState<FormData>({});
	const [errors, setErrors] = useState<Errors>({});

	useEffect(() => {
		const initialData: FormData = {};
		fields.forEach((field) => {
			initialData[field.name] = '';
		});
		setFormData(initialData);
		setErrors({});
	}, [fields]);

	const validateField = useCallback(
		(name: string, value: string) => {
			const fieldConfig = fields.find((f) => f.name === name);
			if (!fieldConfig) return null;

			for (const validator of fieldConfig.validators || []) {
				const error = validator(value, formData);
				if (error) return error;
			}
			return null;
		},
		[fields, formData],
	);

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value, type, files } = event.target as HTMLInputElement;
		const fieldValue =
			type === 'file'
				? files && files.length > 0
					? files[0]
					: null
				: value;

		setFormData((prevData: FormData) => ({
			...prevData,
			[name]: fieldValue as string,
		}));

		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: null,
			}));
		}
	};

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { name, checked } = event.target as HTMLInputElement;
		console.log(name, checked);
		setFormData((prevData: FormData) => ({
			...prevData,
			[name]: checked ? 'true' : 'false',
		}));
	};

	const handleBlur = (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name } = event.target as HTMLInputElement;
		const value = formData[name];
		const error = validateField(name, value);
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: error,
		}));
	};

	const validateForm = useCallback(() => {
		let isValid = true;
		const newErrors: Errors = {};
		fields.forEach((field) => {
			const value = formData[field.name];
			const error = validateField(field.name, value);
			if (error) {
				newErrors[field.name] = error;
				isValid = false;
			}
		});
		setErrors(newErrors);
		return isValid;
	}, [fields, formData, validateField]);

	const handleSubmit = () => {
		if (validateForm()) {
			onSubmit?.(formData);
		}
	};

	const baseInputClasses = clsx(
		'block',
		'w-full',
		'text-sm',
		'transition-colors',
		'duration-150',
		'ease-in-out',
		'rounded-md',
		'shadow-sm',
	);
	const themeInputClasses = clsx(
		'text-gray-900',
		'dark:text-white',
		'placeholder-gray-400',
		'dark:placeholder-gray-500',
		'bg-white',
		'dark:bg-gray-700',
	);
	const focusRingClasses = clsx(
		'focus:outline-none',
		'focus:ring-2',
		'focus:ring-offset-1',
		'dark:focus:ring-offset-gray-800',
	);

	const getInputClasses = (fieldError: string | null) => {
		let borderClasses =
			fieldError !== null
				? clsx(
						'border-red-500',
						'dark:border-red-400',
						'focus:ring-red-500',
						'focus:border-red-500',
				  )
				: clsx(
						'border-gray-300',
						'dark:border-gray-600',
						'focus:ring-indigo-500',
						'dark:focus:ring-indigo-400',
						'focus:border-indigo-500',
						'dark:focus:border-indigo-400',
				  );
		return clsx(
			baseInputClasses,
			themeInputClasses,
			borderClasses,
			focusRingClasses,
		);
	};

	return (
		<div
			className={clsx(
				'space-y-6',
				'p-4',
				'sm:p-6',
				'bg-white',
				'dark:bg-gray-800',
				'shadow-xl',
				'rounded-lg',
			)}>
			{fields.map((field) => {
				const fieldError = errors[field.name];
				const inputId = `form-field-${field.name}`;
				let inputElement: React.ReactNode;

				const commonProps = {
					id: inputId,
					name: field.name,
					onChange: handleChange,
					onBlur: handleBlur,
					'aria-invalid': !!fieldError,
					'aria-describedby': fieldError
						? `${inputId}-error`
						: undefined,
				};

				if (field.type === 'select') {
					inputElement = (
						<select
							{...commonProps}
							value={formData[field.name] || ''}
							className={clsx(
								getInputClasses(fieldError),
								'px-3',
								'py-2',
								'form-select',
								'appearance-none',
								field.icon && 'pl-10',
							)}>
							{field.options?.map((option) => (
								<option
									key={option}
									value={option}
									disabled={option === ''}>
									{option}
								</option>
							))}
						</select>
					);
				} else if (field.type === 'checkbox') {
					inputElement = (
						<div className={clsx('flex', 'items-center', 'mt-1.5')}>
							<input
								type='checkbox'
								{...commonProps}
								onChange={handleCheckboxChange}
								checked={formData[field.name] === 'true'}
								className={clsx(
									'form-checkbox',
									'h-5',
									'w-5',
									'rounded',
									'transition-colors',
									'duration-150',
									'ease-in-out',
								)}
							/>
							<label
								htmlFor={inputId}
								className={clsx(
									'ml-2.5',
									'block',
									'text-sm',
									'text-gray-700',
									'dark:text-gray-300',
									'cursor-pointer',
								)}>
								{field.label}
							</label>
						</div>
					);
				} else {
					let finalInputClasses = getInputClasses(fieldError);
					if (field.type === 'file') {
						finalInputClasses = clsx(
							finalInputClasses,
							'px-0',
							'py-0',
							'file:mr-4',
							'file:py-2',
							'file:px-4',
							'file:rounded-l-md',
							'file:border-0',
							'file:text-sm',
							'file:font-semibold',
							'file:bg-indigo-50',
							'dark:file:bg-gray-600',
							'file:text-indigo-700',
							'dark:file:text-indigo-200',
							'hover:file:bg-indigo-100',
							'dark:hover:file:bg-gray-500',
							'cursor-pointer',
							field.icon && 'pl-10',
						);
					} else {
						finalInputClasses = clsx(
							finalInputClasses,
							'px-3',
							'py-2',
							field.icon && 'pl-10',
						);
					}
					inputElement = (
						<input
							type={field.type}
							{...commonProps}
							value={
								field.type !== 'file'
									? formData[field.name] || ''
									: undefined
							}
							className={finalInputClasses}
							placeholder={field.placeholder || ''}
						/>
					);
				}

				let wrappedInputElement = inputElement;

				if (field.icon) {
					wrappedInputElement = (
						<div className={clsx('relative', 'mb-6')}>
							<div
								className={clsx(
									'absolute',
									'inset-y-0',
									'left-0',
									'pl-3',
									'flex',
									'items-center',
									'pointer-events-none',
								)}>
								<i
									className={clsx(
										field.icon,
										'h-5',
										'w-5',
										'text-slate-400',
										'dark:text-slate-500',
									)}
								/>
							</div>
							{inputElement}
						</div>
					);
				}

				return (
					<div key={field.name} className={clsx('flex', 'flex-col')}>
						{field.type !== 'checkbox' && (
							<label
								htmlFor={inputId}
								className={clsx(
									'block',
									'text-sm',
									'font-medium',
									'text-gray-700',
									'dark:text-gray-300',
									'mb-1.5',
								)}>
								{field.label}
							</label>
						)}
						{wrappedInputElement}
						{fieldError && (
							<p
								id={`${inputId}-error`}
								className={clsx(
									'mt-1.5',
									'text-xs',
									'text-red-600',
									'dark:text-red-400',
								)}
								role='alert'>
								{fieldError}
							</p>
						)}
					</div>
				);
			})}
			<Button onClick={handleSubmit} size={Size.FullWidth}>
				Submit
			</Button>
		</div>
	);
};

export default Form;
