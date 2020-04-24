/** Element Style */
const MODULE_NAME$ = "styles/elements/Content"
console.debug(MODULE_NAME$)

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
