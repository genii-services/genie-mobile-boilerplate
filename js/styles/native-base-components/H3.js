/** 공통 라이브러리 */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		color: theme.textColor,
		fontSize: theme.fontSizeH3,
		lineHeight: theme.lineHeightH3,
	}
}
