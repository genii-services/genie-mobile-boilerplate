//*.for react-native 0.61.5, checked at 2020-02-17

module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		["@babel/plugin-proposal-optional-chaining"],
		[
			"module-resolver",
			{
				root: ["./js"],
				alias: {
					"": "./js",
					"~": "./js",
					"@images": "./images",
					"@svgs": "./svgs",
				},
			},
		],
	],
}
