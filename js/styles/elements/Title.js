/** Element Style */
const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
	return {
		fontSize: style.titleFontSize,
		fontFamily: style.titleFontfamily,
		color: style.titleFontColor,
		fontWeight: itsIOS && "700",
		textAlign: CENTER,
		paddingLeft: itsIOS ? 4 : 0,
		marginLeft: itsIOS ? undefined : -3,
		paddingTop: 1,
	}
}
