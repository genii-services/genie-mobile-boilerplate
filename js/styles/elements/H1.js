/** H1 Element Style */
const MODULE_NAME$ = "styles/elements/H1"
console.debug(MODULE_NAME$)

module.exports = (style) => {
	return {
		color: style.textColor,
		fontSize: style.fontSizeH1,
		lineHeight: style.lineHeightH1,
	}
}
