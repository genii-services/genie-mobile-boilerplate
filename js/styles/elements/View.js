/** Element Style */
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		".padder": {
			padding: style.contentPadding,
		},
	}
}
