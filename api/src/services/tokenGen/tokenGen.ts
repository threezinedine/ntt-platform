import TokenGenService, { TokenInfo } from './interface';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_CONFIG } from '../../config';

interface TokenGenInfo extends TokenInfo {
	exp: number;
}

class TokenGen implements TokenGenService {
	async generateAccessToken(user: TokenInfo): Promise<string> {
		const tokenGenInfo: TokenGenInfo = {
			...user,
			exp:
				Math.floor(Date.now() / 1000) +
				JWT_SECRET_CONFIG.accessTokenExpiresIn * 60,
		};

		return Promise.resolve(
			jwt.sign(tokenGenInfo, JWT_SECRET_CONFIG.accessTokenSecret),
		);
	}

	async generateRefreshToken(user: TokenInfo): Promise<string> {
		const tokenGenInfo: TokenGenInfo = {
			...user,
			exp:
				Math.floor(Date.now() / 1000) +
				JWT_SECRET_CONFIG.refreshTokenExpiresIn * 60,
		};

		return Promise.resolve(
			jwt.sign(tokenGenInfo, JWT_SECRET_CONFIG.refreshTokenSecret),
		);
	}

	verifyAccessToken(token: string): Promise<TokenInfo> {
		return Promise.resolve(
			jwt.verify(token, JWT_SECRET_CONFIG.accessTokenSecret) as TokenInfo,
		);
	}

	verifyRefreshToken(token: string): Promise<TokenInfo> {
		return Promise.resolve(
			jwt.verify(
				token,
				JWT_SECRET_CONFIG.refreshTokenSecret,
			) as TokenInfo,
		);
	}
}

export default TokenGen;
