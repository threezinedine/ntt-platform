import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

type RedirectProps = {
	redirectTo: string;
};

const Redirect: React.FC<RedirectProps> = ({ redirectTo }) => {
	const navigator = useNavigate();

	useEffect(() => {
		navigator(redirectTo);
	}, [redirectTo]);

	return <div>Redirect ...</div>;
};

export default Redirect;
