/** Element Style */
const MODULE_NAME$ = "styles/elements/Icon"
console.debug(MODULE_NAME$)

module.exports = (style) => {
	return {
		fontSize: style.iconSize,
		color: style.textColor,
	}
}
