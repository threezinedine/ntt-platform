import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const MYSQL_DB_CONFIG = {
	host: process.env.DATABASE_HOST || 'localhost',
	port: Number(process.env.DATABASE_PORT) || 3306,
	user: process.env.DATABASE_USER || 'root',
	password: process.env.DATABASE_PASSWORD || 'root',
	database: process.env.DATABASE_NAME || 'test',
};

export const PORT = Number(process.env.PORT) || 8888;

export const MODE = process.env.MODE || 'development';

export const JWT_SECRET_CONFIG = {
	accessTokenSecret:
		process.env.ACCESS_TOKEN_SECRET_KEY || 'access_token_secret',
	accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXP_TIME) || 5,
	refreshTokenSecret:
		process.env.REFRESH_TOKEN_SCRET_KEY || 'refresh_token_secret',
	refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXP_TIME) || 100,
};

console.log(JWT_SECRET_CONFIG);
