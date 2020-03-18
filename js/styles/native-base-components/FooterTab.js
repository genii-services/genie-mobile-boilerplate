/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const footerTabTheme = {
		"NativeBase.Button": {
			".active": {
				"NativeBase.Text": {
					color: theme.tabBarActiveTextColor,
					fontSize: theme.tabBarTextSize,
					lineHeight: 16,
				},
				"NativeBase.Icon": {
					color: theme.tabBarActiveTextColor,
				},
				"NativeBase.IconNB": {
					color: theme.tabBarActiveTextColor,
				},
				backgroundColor: theme.tabActiveBgColor,
			},
			flexDirection: null,
			backgroundColor: "transparent",
			borderColor: null,
			elevation: 0,
			shadowColor: null,
			shadowOffset: null,
			shadowRadius: null,
			shadowOpacity: null,
			alignSelf: CENTER,
			flex: 1,
			height: theme.footerHeight,
			justifyContent: CENTER,
			".badge": {
				"NativeBase.Badge": {
					"NativeBase.Text": {
						fontSize: 11,
						fontWeight: itsIOS ? "600" : undefined,
						lineHeight: 14,
					},
					top: -3,
					alignSelf: CENTER,
					left: 10,
					zIndex: 99,
					height: 18,
					padding: 1.7,
					paddingHorizontal: 3,
				},
				"NativeBase.Icon": {
					marginTop: -18,
				},
			},
			"NativeBase.Icon": {
				color: theme.tabBarTextColor,
			},
			"NativeBase.IconNB": {
				color: theme.tabBarTextColor,
			},
			"NativeBase.Text": {
				color: theme.tabBarTextColor,
				fontSize: theme.tabBarTextSize,
				lineHeight: 16,
			},
		},
		backgroundColor: itsAndroid ? theme.footerDefaultBg : undefined,
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
		alignSelf: "stretch",
	}

	return footerTabTheme
}
