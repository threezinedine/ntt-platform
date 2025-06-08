import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	verbose: true,
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};

export default config;
