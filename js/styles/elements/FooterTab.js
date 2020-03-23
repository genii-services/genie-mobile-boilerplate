/** Element Style */
const { CENTER, FLEX_START, FLEX_END, ROW, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const footerTabTheme = {
		"elements/Button": {
			".active": {
				"elements/Text": {
					color: theme.tabBarActiveTextColor,
					fontSize: theme.tabBarTextSize,
					lineHeight: 16,
				},
				"elements/Icon": {
					color: theme.tabBarActiveTextColor,
				},
				"elements/IconNB": {
					color: theme.tabBarActiveTextColor,
				},
				backgroundColor: theme.tabActiveBgColor,
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
			height: theme.footerHeight,
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
				color: theme.tabBarTextColor,
			},
			"elements/IconNB": {
				color: theme.tabBarTextColor,
			},
			"elements/Text": {
				color: theme.tabBarTextColor,
				fontSize: theme.tabBarTextSize,
				lineHeight: 16,
			},
		},
		backgroundColor: itsAndroid ? theme.footerDefaultBg : undefined,
		flexDirection: ROW,
		justifyContent: SPACE_BETWEEN,
		flex: 1,
		alignSelf: "stretch",
	}

	return footerTabTheme
}
