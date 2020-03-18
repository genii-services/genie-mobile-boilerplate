/** 공통 라이브러리 */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		".padder": {
			padding: theme.contentPadding,
		},
	}
}
