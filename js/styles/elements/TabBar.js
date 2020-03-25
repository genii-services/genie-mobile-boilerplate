/** TabBar Element Style */
const { CENTER, ROW, TRANSPARENT } = require("/constants/style")

module.exports = style => {
	return {
		".tabIcon": {
			height: undefined,
		},
		".vertical": {
			height: 60,
		},
		"elements/Button": {
			".transparent": {
				"elements/Text": {
					fontSize: style.tabFontSize,
					color: style.sTabBarActiveTextColor,
					fontWeight: "400",
				},
				"elements/IconNB": {
					color: style.sTabBarActiveTextColor,
				},
			},
			"elements/IconNB": {
				color: style.sTabBarActiveTextColor,
			},
			"elements/Text": {
				fontSize: style.tabFontSize,
				color: style.sTabBarActiveTextColor,
				fontWeight: "400",
			},
			".isTabActive": {
				"elements/Text": {
					fontWeight: "900",
				},
			},
			flex: 1,
			alignSelf: "stretch",
			alignItems: CENTER,
			justifyContent: CENTER,
			borderRadius: null,
			borderBottomColor: TRANSPARENT,
			backgroundColor: style.tabBgColor,
		},
		height: 45,
		flexDirection: ROW,
		justifyContent: "space-around",
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomColor: "#ccc",
		backgroundColor: style.tabBgColor,
	}
}
