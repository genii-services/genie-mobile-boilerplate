/** Element Style */
const { TRANSPARENT } = require("/constants/style")

module.exports = () => {
	return {
		flex: 1,
		backgroundColor: TRANSPARENT,
		SegmentElement: {
			borderWidth: 0,
			backgroundColor: TRANSPARENT,
		},
	}
}
