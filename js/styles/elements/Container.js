/** Element Style */
const { itsIOS, deviceHeight } = require("/utils/device")

module.exports = style => {
	return {
		flex: 1,
		height: itsIOS ? deviceHeight : deviceHeight - 20,
		backgroundColor: style.containerBgColor,
	}
}
