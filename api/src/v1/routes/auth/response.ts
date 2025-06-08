export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
};

export type RegisterResponse = {};

export type UserResponse = {
	userId: string;
	username: string;
	role: 'admin' | 'user';
};
