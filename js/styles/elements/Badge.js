/** Element Style */
const MODULE_NAME$ = "styles/elements/Badge"
console.debug(MODULE_NAME$)

const { CENTER, FLEX_START } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = (style) => {
	const badgeTheme = {
		".primary": {
			backgroundColor: style.buttonPrimaryBg,
		},
		".warning": {
			backgroundColor: style.buttonWarningBg,
		},
		".info": {
			backgroundColor: style.buttonInfoBg,
		},
		".success": {
			backgroundColor: style.buttonSuccessBg,
		},
		".danger": {
			backgroundColor: style.buttonDangerBg,
		},
		TextElement: {
			color: style.badgeColor,
			fontSize: style.fontSize,
			lineHeight: style.lineHeight - 1,
			textAlign: CENTER,
			paddingHorizontal: 3,
		},
		backgroundColor: style.badgeBg,
		padding: style.badgePadding,
		paddingHorizontal: 6,
		alignSelf: FLEX_START,
		justifyContent: itsIOS && CENTER,
		borderRadius: 13.5,
		height: 27,
	}
	return badgeTheme
}
