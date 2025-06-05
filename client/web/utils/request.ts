import axios from 'axios';

const request = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 2000,
});

export default request;
