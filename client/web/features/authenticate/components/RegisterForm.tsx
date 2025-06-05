import React from 'react';
import Form from '@/components/form';
import { lengthValidator } from '@/components/form/validators';

const RegisterForm: React.FC = () => {
	return (
		<Form
			fields={[
				{
					label: 'Username',
					name: 'username',
					type: 'text',
					placeholder: 'Enter your username',
					icon: 'fa-solid fa-user',
					validators: [lengthValidator(8, 20)],
				},
				{
					label: 'Password',
					name: 'password',
					type: 'password',
					placeholder: 'Enter your password',
					icon: 'fa-solid fa-lock',
				},
				{
					label: 'Confirm Password',
					name: 'confirmPassword',
					type: 'password',
					placeholder: 'Confirm your password',
					icon: 'fa-solid fa-lock',
				},
			]}
		/>
	);
};

export default RegisterForm;
