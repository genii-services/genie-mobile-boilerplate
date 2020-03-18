/** 공통 라이브러리 */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		".multiline": {
			height: null,
		},
		height: theme.inputHeightBase,
		color: theme.inputColor,
		paddingLeft: 5,
		paddingRight: 5,
		flex: 1,
		fontSize: theme.inputFontSize,
	}
}
