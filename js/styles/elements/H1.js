/** Element Style */
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		color: style.textColor,
		fontSize: style.fontSizeH1,
		lineHeight: style.lineHeightH1,
	}
}
