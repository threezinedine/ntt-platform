import React from 'react';
import Form, { FormData } from '@/components/form';
import { lengthValidator } from '@/components/form/validators';
import { useToastContext } from '@/components/toast';
import { request } from '@/utils';
import { useAuthContext } from '@/features/authenticate';
import { useNavigate } from 'react-router';

const LoginForm: React.FC = () => {
	const { addToast } = useToastContext();
	const { loggedIn } = useAuthContext();
	const navigator = useNavigate();

	const handleSubmit = async (
		data: FormData,
		setLoading: (state: boolean) => void,
	) => {
		setLoading(true);
		try {
			const res = await request.post('/login', data);
			if (res.status === 200) {
				addToast({
					message: 'Login successful',
					type: 'success',
					duration: 3000,
				});
				loggedIn();
				localStorage.setItem('access_token', res.data.access_token);
				localStorage.setItem('refresh_token', res.data.refresh_token);
				navigator('/');
			} else {
				addToast({
					message: 'Login failed',
					type: 'error',
					duration: 3000,
				});
			}
		} catch (error: any) {
			console.log(error);
			if (error.response.status) {
				addToast({
					message: error.response.data,
					type: 'error',
					duration: 3000,
				});
			} else {
				addToast({
					message: error.message,
					type: 'error',
					duration: 3000,
				});
			}
		}
		setLoading(false);
	};

	return (
		<Form
			onSubmit={handleSubmit}
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
			]}
		/>
	);
};

export default LoginForm;
