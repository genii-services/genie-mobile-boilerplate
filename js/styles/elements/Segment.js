/** Segment Element Style */
const { CENTER, ROW, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		height: 45,
		borderColor: theme.segmentBorderColorMain,
		flexDirection: ROW,
		justifyContent: CENTER,
		backgroundColor: theme.segmentBackgroundColor,
		"elements/Button": {
			alignSelf: CENTER,
			borderRadius: 0,
			paddingTop: 3,
			paddingBottom: 3,
			height: 30,
			backgroundColor: TRANSPARENT,
			borderWidth: 1,
			borderLeftWidth: 0,
			borderColor: theme.segmentBorderColor,
			elevation: 0,
			".active": {
				backgroundColor: theme.segmentActiveBackgroundColor,
				"elements/Text": {
					color: theme.segmentActiveTextColor,
				},
				"elements/Icon": {
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
			"elements/Text": {
				color: theme.segmentTextColor,
				fontSize: 14,
			},
			"elements/Icon": {
				fontSize: 22,
				paddingTop: 0,
				color: theme.segmentTextColor,
			},
		},
	}
}
