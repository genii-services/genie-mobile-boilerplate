/** Element Style */
const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		fontSize: style.subTitleFontSize,
		fontFamily: style.titleFontfamily,
		color: style.subtitleColor,
		textAlign: CENTER,
		paddingLeft: itsIOS ? 4 : 0,
		marginLeft: itsIOS ? undefined : -3,
	}
}
