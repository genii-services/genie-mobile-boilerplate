/** 공통 라이브러리 */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		fontSize: theme.DefaultFontSize,
		fontFamily: theme.fontFamily,
		color: theme.textColor,
		".note": {
			color: "#a7a7a7",
			fontSize: theme.noteFontSize,
		},
	}
}
