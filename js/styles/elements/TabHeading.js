/** Element Style */
const { CENTER, ROW } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")

module.exports = style => {
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
		TextElement: {
			color: style.topTabBarTextColor,
			marginHorizontal: 7,
		},
		IconElement: {
			color: style.topTabBarTextColor,
			fontSize: itsIOS && 26,
		},
		".active": {
			TextElement: {
				color: style.topTabBarActiveTextColor,
				fontWeight: "600",
			},
			IconElement: {
				color: style.topTabBarActiveTextColor,
			},
		},
	}
}
