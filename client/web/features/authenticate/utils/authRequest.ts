import { request } from '@/utils';
import { AxiosResponse } from 'axios';

export type LoginRequest = {
	username: string;
	password: string;
};

export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
};

const loginRequest = (
	data: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
	return request.post<LoginResponse>('v1/auth/login', data);
};

export type RefreshTokenRequest = {
	accessToken: string;
	refreshToken: string;
};

export type RefreshTokenResponse = {
	accessToken: string;
};

const refreshTokenRequest = (
	data: RefreshTokenRequest,
): Promise<AxiosResponse<RefreshTokenResponse>> => {
	return request.post<RefreshTokenResponse>('v1/auth/refresh', data);
};

export { loginRequest, refreshTokenRequest };
