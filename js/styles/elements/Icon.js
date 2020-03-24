/** Element Style */
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		fontSize: style.iconFontSize,
		color: defaultThemeStyle.textColor,
	}
}
