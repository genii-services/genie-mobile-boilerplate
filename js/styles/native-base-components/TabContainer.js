/** 공통 라이브러리 */
const { MATERIAL } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const { platformStyle } = theme

	const tabContainerTheme = {
		elevation: 3,
		height: 50,
		flexDirection: "row",
		shadowColor: platformStyle === MATERIAL ? "#000" : undefined,
		shadowOffset: platformStyle === MATERIAL ? { width: 0, height: 2 } : undefined,
		shadowOpacity: platformStyle === MATERIAL ? 0.2 : undefined,
		shadowRadius: platformStyle === MATERIAL ? 1.2 : undefined,
		justifyContent: "space-around",
		borderBottomWidth: itsIOS ? theme.borderWidth : 0,
		borderColor: theme.topTabBarBorderColor,
	}

	return tabContainerTheme
}
