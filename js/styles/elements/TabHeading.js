/** Element Style */
const { CENTER, ROW } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		flexDirection: ROW,
		backgroundColor: style.tabDefaultBg,
		flex: 1,
		alignItems: CENTER,
		justifyContent: CENTER,
		".scrollable": {
			paddingHorizontal: 20,
			flex: itsAndroid ? 0 : 1,
			minWidth: itsAndroid ? undefined : 60,
		},
		"elements/Text": {
			color: style.topTabBarTextColor,
			marginHorizontal: 7,
		},
		"elements/Icon": {
			color: style.topTabBarTextColor,
			fontSize: itsIOS ? 26 : undefined,
		},
		".active": {
			"elements/Text": {
				color: style.topTabBarActiveTextColor,
				fontWeight: "600",
			},
			"elements/Icon": {
				color: style.topTabBarActiveTextColor,
			},
		},
	}
}
