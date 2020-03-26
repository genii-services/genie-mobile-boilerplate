/** Element Style */
const { CENTER, ROW, SPACE_BETWEEN, TRANSPARENT, WHITE } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
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
		TextElement: {
			color: WHITE,
			flex: 1,
		},
		ButtonElement: {
			backgroundColor: TRANSPARENT,
			height: 30,
			elevation: 0,
			TextElement: {
				fontSize: 14,
			},
		},
	}
}
