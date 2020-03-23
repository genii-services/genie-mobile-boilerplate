/** Element Style */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		fontSize: theme.iconFontSize,
		color: defaultTheme.textColor,
	}
}
