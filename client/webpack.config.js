const path = require("path");

module.exports = {
	entry: "./web/main.tsx",
	mode: "development",
	output: {
		path: path.resolve(__dirname, "public/js"),
		filename: "main.js",
	},
	resolve: {
		alias: {
			"@/*": path.resolve(__dirname, "web/*"),
		},
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},
	module: {
		rules: [
			{
				loader: "babel-loader",
				test: /\.tsx?$/,
				exclude: /node_modules/,
				options: {
					presets: [
						"@babel/preset-env",
						"@babel/preset-react",
						"@babel/preset-typescript",
					],
				},
			},
		],
	},
};
