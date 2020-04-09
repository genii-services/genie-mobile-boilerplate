/** Element Style */
const MODULE_NAME$ = "styles/elements/FooterTab"
console.debug(MODULE_NAME$)

const { CENTER, FLEX_START, FLEX_END, ROW, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")

module.exports = (style) => {
	return {
		ButtonElement: {
			".active": {
				TextElement: {
					color: style.tabBarActiveTextColor,
					fontSize: style.tabBarTextSize,
					lineHeight: 16,
				},
				IconElement: {
					color: style.tabBarActiveTextColor,
				},
				IconNBElement: {
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
				BadgeElement: {
					TextElement: {
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
				IconElement: {
					marginTop: -18,
				},
			},
			IconElement: {
				color: style.tabBarTextColor,
			},
			IconNBElement: {
				color: style.tabBarTextColor,
			},
			TextElement: {
				color: style.tabBarTextColor,
				fontSize: style.tabBarTextSize,
				lineHeight: 16,
			},
		},
		backgroundColor: itsAndroid && style.footerDefaultBg,
		flexDirection: ROW,
		justifyContent: SPACE_BETWEEN,
		flex: 1,
		alignSelf: "stretch",
	}
}
