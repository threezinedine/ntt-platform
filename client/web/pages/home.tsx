import React from 'react';
import Button from '@/components/button';
import { useNavigate } from 'react-router';

const Home: React.FC = () => {
	const navigator = useNavigate();

	return (
		<div>
			<h1>Home</h1>
			<Button onClick={() => navigator('/about')}>Click me</Button>
		</div>
	);
};

export default Home;
