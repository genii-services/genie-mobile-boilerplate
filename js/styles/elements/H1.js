/** Element Style */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		color: theme.textColor,
		fontSize: theme.fontSizeH1,
		lineHeight: theme.lineHeightH1,
	}
}
