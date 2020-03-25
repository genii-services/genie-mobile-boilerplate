/** TabContainer Element Style */
const { BLACK, MATERIAL, ROW } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
	const { platformStyle } = style

	const tabContainerTheme = {
		elevation: 3,
		height: 50,
		flexDirection: ROW,
		shadowColor: platformStyle === MATERIAL ? BLACK : undefined,
		shadowOffset: platformStyle === MATERIAL ? { width: 0, height: 2 } : undefined,
		shadowOpacity: platformStyle === MATERIAL ? 0.2 : undefined,
		shadowRadius: platformStyle === MATERIAL ? 1.2 : undefined,
		justifyContent: "space-around",
		borderBottomWidth: itsIOS ? style.borderWidth : 0,
		borderColor: style.topTabBarBorderColor,
	}

	return tabContainerTheme
}
