/** Element Style */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		color: theme.textColor,
		fontSize: theme.fontSizeH2,
		lineHeight: theme.lineHeightH2,
	}
}
