/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const tabBarTheme = {
		".tabIcon": {
			height: undefined,
		},
		".vertical": {
			height: 60,
		},
		"NativeBase.Button": {
			".transparent": {
				"NativeBase.Text": {
					fontSize: theme.tabFontSize,
					color: theme.sTabBarActiveTextColor,
					fontWeight: "400",
				},
				"NativeBase.IconNB": {
					color: theme.sTabBarActiveTextColor,
				},
			},
			"NativeBase.IconNB": {
				color: theme.sTabBarActiveTextColor,
			},
			"NativeBase.Text": {
				fontSize: theme.tabFontSize,
				color: theme.sTabBarActiveTextColor,
				fontWeight: "400",
			},
			".isTabActive": {
				"NativeBase.Text": {
					fontWeight: "900",
				},
			},
			flex: 1,
			alignSelf: "stretch",
			alignItems: CENTER,
			justifyContent: CENTER,
			borderRadius: null,
			borderBottomColor: "transparent",
			backgroundColor: theme.tabBgColor,
		},
		height: 45,
		flexDirection: "row",
		justifyContent: "space-around",
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomColor: "#ccc",
		backgroundColor: theme.tabBgColor,
	}

	return tabBarTheme
}
