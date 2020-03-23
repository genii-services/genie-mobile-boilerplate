/** Element Style */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		".padder": {
			padding: theme.contentPadding,
		},
	}
}
