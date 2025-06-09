import axios from 'axios';

const request = axios.create({
	baseURL: 'http://localhost:8888/api',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 2000,
});

export type ErrorResponse = {
	message: string;
};

export default request;
