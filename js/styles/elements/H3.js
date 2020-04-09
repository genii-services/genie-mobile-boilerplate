/** Element Style */
const MODULE_NAME$ = "styles/elements/H3"
console.debug(MODULE_NAME$)

module.exports = (style) => {
	return {
		color: style.textColor,
		fontSize: style.fontSizeH3,
		lineHeight: style.lineHeightH3,
	}
}
