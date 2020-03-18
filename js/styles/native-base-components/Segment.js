/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		height: 45,
		borderColor: theme.segmentBorderColorMain,
		flexDirection: "row",
		justifyContent: CENTER,
		backgroundColor: theme.segmentBackgroundColor,
		"NativeBase.Button": {
			alignSelf: CENTER,
			borderRadius: 0,
			paddingTop: 3,
			paddingBottom: 3,
			height: 30,
			backgroundColor: "transparent",
			borderWidth: 1,
			borderLeftWidth: 0,
			borderColor: theme.segmentBorderColor,
			elevation: 0,
			".active": {
				backgroundColor: theme.segmentActiveBackgroundColor,
				"NativeBase.Text": {
					color: theme.segmentActiveTextColor,
				},
				"NativeBase.Icon": {
					color: theme.segmentActiveTextColor,
				},
			},
			".first": {
				borderTopLeftRadius: itsIOS ? 5 : undefined,
				borderBottomLeftRadius: itsIOS ? 5 : undefined,
				borderLeftWidth: 1,
			},
			".last": {
				borderTopRightRadius: itsIOS ? 5 : undefined,
				borderBottomRightRadius: itsIOS ? 5 : undefined,
			},
			"NativeBase.Text": {
				color: theme.segmentTextColor,
				fontSize: 14,
			},
			"NativeBase.Icon": {
				fontSize: 22,
				paddingTop: 0,
				color: theme.segmentTextColor,
			},
		},
	}
}
