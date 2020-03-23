/** Element Style */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		".underline": {
			borderBottomWidth: theme.borderWidth,
			marginTop: 5,
			borderColor: theme.inputBorderColor,
		},
		".bordered": {
			borderWidth: 1,
			marginTop: 5,
			borderColor: theme.inputBorderColor,
		},
		color: theme.textColor,
		paddingLeft: 10,
		paddingRight: 5,
		fontSize: 15,
		textAlignVertical: "top",
	}
}
