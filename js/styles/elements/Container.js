/** Element Style */
const MODULE_NAME$ = "styles/elements/Container"
console.debug(MODULE_NAME$)

const { itsIOS, deviceHeight } = require("/utils/device")

module.exports = (style) => {
	return {
		flex: 1,
		height: itsIOS ? deviceHeight : deviceHeight - 20,
		backgroundColor: style.containerBgColor,
	}
}
