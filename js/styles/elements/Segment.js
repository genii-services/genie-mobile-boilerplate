/** Segment Element Style */
const { CENTER, ROW, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
	return {
		height: 45,
		borderColor: style.segmentBorderColorMain,
		flexDirection: ROW,
		justifyContent: CENTER,
		backgroundColor: style.segmentBackgroundColor,
		"elements/Button": {
			alignSelf: CENTER,
			borderRadius: 0,
			paddingTop: 3,
			paddingBottom: 3,
			height: 30,
			backgroundColor: TRANSPARENT,
			borderWidth: 1,
			borderLeftWidth: 0,
			borderColor: style.segmentBorderColor,
			elevation: 0,
			".active": {
				backgroundColor: style.segmentActiveBackgroundColor,
				"elements/Text": {
					color: style.segmentActiveTextColor,
				},
				"elements/Icon": {
					color: style.segmentActiveTextColor,
				},
			},
			".first": {
				borderTopLeftRadius: itsIOS && 5,
				borderBottomLeftRadius: itsIOS && 5,
				borderLeftWidth: 1,
			},
			".last": {
				borderTopRightRadius: itsIOS && 5,
				borderBottomRightRadius: itsIOS && 5,
			},
			"elements/Text": {
				color: style.segmentTextColor,
				fontSize: 14,
			},
			"elements/Icon": {
				fontSize: 22,
				paddingTop: 0,
				color: style.segmentTextColor,
			},
		},
	}
}
