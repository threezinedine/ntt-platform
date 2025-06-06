import { request } from '@/utils';
import { AxiosResponse } from 'axios';

export type LoginRequest = {
	username: string;
	password: string;
};

export type LoginResponse = {
	access_token: string;
	refresh_token: string;
};

const loginRequest = (
	data: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
	return request.post<LoginResponse>('/login', data);
};

export type RefreshTokenRequest = {
	access_token: string;
	refresh_token: string;
};

export type RefreshTokenResponse = {
	access_token: string;
};

const refreshTokenRequest = (
	data: RefreshTokenRequest,
): Promise<AxiosResponse<RefreshTokenResponse>> => {
	return request.post<RefreshTokenResponse>('/refresh-token', data);
};

export { loginRequest, refreshTokenRequest };
