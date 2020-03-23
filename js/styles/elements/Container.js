/** Element Style */
const { itsIOS, deviceHeight } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		flex: 1,
		height: itsIOS ? deviceHeight : deviceHeight - 20,
		backgroundColor: theme.containerBgColor,
	}
}
