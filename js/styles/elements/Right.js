/** Element Style */
const { CENTER, FLEX_END } = require("/constants/style")

module.exports = () => {
	return {
		ButtonElement: {
			alignSelf: null,
		},
		flex: 1,
		alignSelf: CENTER,
		alignItems: FLEX_END,
	}
}
