/** Element Style */
const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		fontSize: style.titleFontSize,
		fontFamily: style.titleFontfamily,
		color: style.titleFontColor,
		fontWeight: itsIOS ? "700" : undefined,
		textAlign: CENTER,
		paddingLeft: itsIOS ? 4 : 0,
		marginLeft: itsIOS ? undefined : -3,
		paddingTop: 1,
	}
}
