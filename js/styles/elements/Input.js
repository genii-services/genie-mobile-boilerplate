/** Element Style */
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		".multiline": {
			height: null,
		},
		height: style.inputHeightBase,
		color: style.inputColor,
		paddingLeft: 5,
		paddingRight: 5,
		flex: 1,
		fontSize: style.inputFontSize,
	}
}
