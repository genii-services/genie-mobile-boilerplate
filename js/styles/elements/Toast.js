/** Element Style */
const { CENTER, ROW, SPACE_BETWEEN, TRANSPARENT, WHITE } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return {
		".danger": {
			backgroundColor: style.brandDanger,
		},
		".warning": {
			backgroundColor: style.brandWarning,
		},
		".success": {
			backgroundColor: style.brandSuccess,
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
