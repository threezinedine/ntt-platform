import type { StorybookConfig } from "@storybook/react-webpack5";
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
	stories: ["../web/**/*.mdx", "../web/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-webpack5-compiler-swc",
		"@storybook/addon-onboarding",
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	webpackFinal: async (config) => {
		if (config.resolve) {
			config.resolve.plugins = [
				...(config.resolve.plugins || []),
				new TsConfigPathsPlugin({
					extensions: config.resolve.extensions,
				}),
			];
		}
		return config;
	},
};
export default config;
