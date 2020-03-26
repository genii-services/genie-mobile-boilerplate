/** Element Style */
const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
	return {
		fontSize: style.subTitleFontSize,
		fontFamily: style.titleFontfamily,
		color: style.subtitleColor,
		textAlign: CENTER,
		paddingLeft: itsIOS ? 4 : 0,
		marginLeft: itsIOS ? undefined : -3,
	}
}
