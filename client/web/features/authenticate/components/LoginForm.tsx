import React from 'react';
import Form, { FormData } from '@/components/form';
import { lengthValidator } from '@/components/form/validators';
import { useToastContext } from '@/components/toast';
import { useAuthContext } from '@/features/authenticate';
import { useNavigate } from 'react-router';
import { LoginRequest, loginRequest } from '../utils/authRequest';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../data/constants';

const LoginForm: React.FC = () => {
	const addToast = useToastContext((state) => state.addToast);
	const { loggedIn } = useAuthContext();
	const navigator = useNavigate();

	const handleSubmit = (
		data: FormData,
		setLoading: (state: boolean) => void,
	) => {
		setLoading(true);
		loginRequest(data as LoginRequest)
			.then((res) => {
				if (res.status === 200) {
					addToast({
						message: 'Login successful',
						type: 'success',
						duration: 3000,
					});
					loggedIn();
					localStorage.setItem(
						ACCESS_TOKEN_KEY,
						res.data.accessToken,
					);
					localStorage.setItem(
						REFRESH_TOKEN_KEY,
						res.data.refreshToken,
					);
					navigator('/');
					window.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
				}
			})
			.catch((error) => {
				if (
					error.response &&
					error.response.status &&
					error.response.data.message
				) {
					addToast({
						message: error.response.data.message,
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
			})
			.finally(() => {
				setLoading(false);
			});
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
