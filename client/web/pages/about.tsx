import Button from '@/components/button';
import React from 'react';
import { useNavigate } from 'react-router';

const About: React.FC = () => {
	const navigator = useNavigate();

	return (
		<div>
			<h1>About</h1>
			<Button onClick={() => navigator('/home')}>Click me</Button>
		</div>
	);
};

export default About;
