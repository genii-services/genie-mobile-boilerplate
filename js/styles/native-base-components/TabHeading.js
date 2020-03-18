/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const tabHeadingTheme = {
		flexDirection: "row",
		backgroundColor: theme.tabDefaultBg,
		flex: 1,
		alignItems: CENTER,
		justifyContent: CENTER,
		".scrollable": {
			paddingHorizontal: 20,
			flex: itsAndroid ? 0 : 1,
			minWidth: itsAndroid ? undefined : 60,
		},
		"NativeBase.Text": {
			color: theme.topTabBarTextColor,
			marginHorizontal: 7,
		},
		"NativeBase.Icon": {
			color: theme.topTabBarTextColor,
			fontSize: itsIOS ? 26 : undefined,
		},
		".active": {
			"NativeBase.Text": {
				color: theme.topTabBarActiveTextColor,
				fontWeight: "600",
			},
			"NativeBase.Icon": {
				color: theme.topTabBarActiveTextColor,
			},
		},
	}

	return tabHeadingTheme
}
