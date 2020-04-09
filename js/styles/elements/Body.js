/** Element Style */
const MODULE_NAME$ = "styles/elements/Body"
console.debug(MODULE_NAME$)

const { CENTER } = require("/constants/style")

module.exports = () => {
	const bodyTheme = {
		flex: 1,
		alignItems: CENTER,
		alignSelf: CENTER,
	}

	return bodyTheme
}
