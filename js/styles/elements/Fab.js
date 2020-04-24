/** Element Style */
const MODULE_NAME$ = "styles/elements/Fab"
console.debug(MODULE_NAME$)

const { CENTER } = require("/constants/style")

module.exports = () => {
	return {
		ButtonElement: {
			alignItems: CENTER,
			padding: null,
			justifyContent: CENTER,

			IconElement: {
				alignSelf: CENTER,
				fontSize: 20,
				marginLeft: 0,
				marginRight: 0,
			},
		},
	}
}
