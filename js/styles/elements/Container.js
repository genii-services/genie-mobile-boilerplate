/** Element Style */
const { itsIOS, deviceHeight } = require("/utils/device")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		flex: 1,
		height: itsIOS ? deviceHeight : deviceHeight - 20,
		backgroundColor: style.containerBgColor,
	}
}
