/** Element Style */
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		fontSize: style.DefaultFontSize,
		fontFamily: style.fontFamily,
		color: style.textColor,
		".note": {
			color: "#a7a7a7",
			fontSize: style.noteFontSize,
		},
	}
}
