export type LoginRequest = {
	username: string;
	password: string;
};

export type RegisterRequest = LoginRequest;

export type RefreshRequest = {
	refreshToken: string;
	accessToken: string;
};
