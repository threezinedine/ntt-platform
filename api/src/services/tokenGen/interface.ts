export interface TokenInfo {
	userId: string;
	username: string;
	role: string;
}

export default interface TokenGenService {
	generateAccessToken(user: TokenInfo): Promise<string>;
	generateRefreshToken(user: TokenInfo): Promise<string>;

	verifyAccessToken(token: string): Promise<TokenInfo>;
	verifyRefreshToken(token: string): Promise<TokenInfo>;
}
