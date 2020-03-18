/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: CENTER,
		padding: 10,
		minHeight: 50,
		"NativeBase.Text": {
			color: "#fff",
			flex: 1,
		},
		"NativeBase.Button": {
			backgroundColor: "transparent",
			height: 30,
			elevation: 0,
			"NativeBase.Text": {
				fontSize: 14,
			},
		},
	}
}
