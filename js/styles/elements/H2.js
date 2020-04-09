/** Element Style */
const MODULE_NAME$ = "styles/elements/H2"
console.debug(MODULE_NAME$)

module.exports = (style) => {
	return {
		color: style.textColor,
		fontSize: style.fontSizeH2,
		lineHeight: style.lineHeightH2,
	}
}
