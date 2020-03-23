/** Element Style */
const { CENTER, FLEX_START } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const badgeTheme = {
		".primary": {
			backgroundColor: theme.buttonPrimaryBg,
		},
		".warning": {
			backgroundColor: theme.buttonWarningBg,
		},
		".info": {
			backgroundColor: theme.buttonInfoBg,
		},
		".success": {
			backgroundColor: theme.buttonSuccessBg,
		},
		".danger": {
			backgroundColor: theme.buttonDangerBg,
		},
		"elements/Text": {
			color: theme.badgeColor,
			fontSize: theme.fontSizeBase,
			lineHeight: theme.lineHeight - 1,
			textAlign: CENTER,
			paddingHorizontal: 3,
		},
		backgroundColor: theme.badgeBg,
		padding: theme.badgePadding,
		paddingHorizontal: 6,
		alignSelf: FLEX_START,
		justifyContent: itsIOS && CENTER,
		borderRadius: 13.5,
		height: 27,
	}
	return badgeTheme
}
