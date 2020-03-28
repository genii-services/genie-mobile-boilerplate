/** TabContainer Element Style */
const { BLACK, MATERIAL, ROW } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
	const itsMaterial = style.name === MATERIAL
	return {
		elevation: 3,
		height: 50,
		flexDirection: ROW,
		shadowColor: itsMaterial && BLACK,
		shadowOffset: itsMaterial && { width: 0, height: 2 },
		shadowOpacity: itsMaterial && 0.2,
		shadowRadius: itsMaterial && 1.2,
		justifyContent: "space-around",
		borderBottomWidth: itsIOS ? style.borderWidth : 0,
		borderColor: style.topTabBarBorderColor,
	}
}
