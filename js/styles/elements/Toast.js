/** Element Style */
const { CENTER, ROW, SPACE_BETWEEN, TRANSPARENT, WHITE } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		".danger": {
			backgroundColor: theme.brandDanger,
		},
		".warning": {
			backgroundColor: theme.brandWarning,
		},
		".success": {
			backgroundColor: theme.brandSuccess,
		},
		backgroundColor: "rgba(0,0,0,0.8)",
		borderRadius: itsIOS ? 5 : 0,
		flexDirection: ROW,
		justifyContent: SPACE_BETWEEN,
		alignItems: CENTER,
		padding: 10,
		minHeight: 50,
		"elements/Text": {
			color: WHITE,
			flex: 1,
		},
		"elements/Button": {
			backgroundColor: TRANSPARENT,
			height: 30,
			elevation: 0,
			"elements/Text": {
				fontSize: 14,
			},
		},
	}
}
