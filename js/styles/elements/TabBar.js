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
		ButtonElement: {
			".transparent": {
				TextElement: {
					fontSize: style.tabFontSize,
					color: style.sTabBarActiveTextColor,
					fontWeight: "400",
				},
				IconNBElement: {
					color: style.sTabBarActiveTextColor,
				},
			},
			IconNBElement: {
				color: style.sTabBarActiveTextColor,
			},
			TextElement: {
				fontSize: style.tabFontSize,
				color: style.sTabBarActiveTextColor,
				fontWeight: "400",
			},
			".isTabActive": {
				TextElement: {
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
