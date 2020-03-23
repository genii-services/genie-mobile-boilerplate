/** Element Style */
const { CENTER, ROW } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const tabHeadingTheme = {
		flexDirection: ROW,
		backgroundColor: theme.tabDefaultBg,
		flex: 1,
		alignItems: CENTER,
		justifyContent: CENTER,
		".scrollable": {
			paddingHorizontal: 20,
			flex: itsAndroid ? 0 : 1,
			minWidth: itsAndroid ? undefined : 60,
		},
		"elements/Text": {
			color: theme.topTabBarTextColor,
			marginHorizontal: 7,
		},
		"elements/Icon": {
			color: theme.topTabBarTextColor,
			fontSize: itsIOS ? 26 : undefined,
		},
		".active": {
			"elements/Text": {
				color: theme.topTabBarActiveTextColor,
				fontWeight: "600",
			},
			"elements/Icon": {
				color: theme.topTabBarActiveTextColor,
			},
		},
	}

	return tabHeadingTheme
}
