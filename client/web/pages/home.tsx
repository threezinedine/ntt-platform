import React from 'react';
import Button from '@/components/button';
import { useNavigate } from 'react-router';
import { useToastContext } from '@/components/toast';
import Form from '@/components/form';

const Home: React.FC = () => {
	const navigator = useNavigate();
	const addToast = useToastContext((state) => state.addToast);

	return (
		<div>
			<Form
				fields={[
					{
						label: 'Username',
						name: 'username',
						type: 'text',
						placeholder: 'Enter your username',
					},
				]}
			/>
			<Button onClick={() => navigator('/about')}>Click me</Button>
			<Button
				onClick={() =>
					addToast({
						message: 'Hello',
						type: 'success',
						duration: 3000,
					})
				}>
				Success Button
			</Button>
			<Button
				onClick={() =>
					addToast({
						message: 'Hello',
						type: 'error',
						duration: 3000,
					})
				}>
				Error Button
			</Button>
			<Button
				onClick={() =>
					addToast({
						message: 'Hello',
						type: 'warning',
						duration: 3000,
					})
				}>
				Warning Button
			</Button>
			<Button
				onClick={() =>
					addToast({
						message: 'Hello',
						type: 'info',
						duration: 3000,
					})
				}>
				Info Button
			</Button>
		</div>
	);
};

export default Home;
