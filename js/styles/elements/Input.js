/** Element Style */
const MODULE_NAME$ = "styles/elements/Input"
console.debug(MODULE_NAME$)

module.exports = (style) => {
	return {
		".multiline": {
			height: null,
		},
		height: style.inputHeightBase,
		color: style.inputColor,
		paddingLeft: 5,
		paddingRight: 5,
		flex: 1,
		fontSize: style.inputFontSize,
	}
}
