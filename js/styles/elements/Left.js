const { CENTER, FLEX_START } = require("/constants/style")

module.exports = () => {
	const leftTheme = {
		flex: 1,
		alignSelf: CENTER,
		alignItems: FLEX_START,
	}

	return leftTheme
}
