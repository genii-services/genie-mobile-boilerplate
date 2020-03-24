/** Element Style */
const { CENTER, FLEX_START, FLEX_END, ROW, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		"elements/Button": {
			".active": {
				"elements/Text": {
					color: style.tabBarActiveTextColor,
					fontSize: style.tabBarTextSize,
					lineHeight: 16,
				},
				"elements/Icon": {
					color: style.tabBarActiveTextColor,
				},
				"elements/IconNB": {
					color: style.tabBarActiveTextColor,
				},
				backgroundColor: style.tabActiveBgColor,
			},
			flexDirection: null,
			backgroundColor: TRANSPARENT,
			borderColor: null,
			elevation: 0,
			shadowColor: null,
			shadowOffset: null,
			shadowRadius: null,
			shadowOpacity: null,
			alignSelf: CENTER,
			flex: 1,
			height: style.footerHeight,
			justifyContent: CENTER,
			".badge": {
				"elements/Badge": {
					"elements/Text": {
						fontSize: 11,
						fontWeight: itsIOS && "600",
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
				"elements/Icon": {
					marginTop: -18,
				},
			},
			"elements/Icon": {
				color: style.tabBarTextColor,
			},
			"elements/IconNB": {
				color: style.tabBarTextColor,
			},
			"elements/Text": {
				color: style.tabBarTextColor,
				fontSize: style.tabBarTextSize,
				lineHeight: 16,
			},
		},
		backgroundColor: itsAndroid ? style.footerDefaultBg : undefined,
		flexDirection: ROW,
		justifyContent: SPACE_BETWEEN,
		flex: 1,
		alignSelf: "stretch",
	}
}
