/** Element Style */
const { CENTER } = require("/constants/style")

module.exports = () => {
	const fabTheme = {
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
			IconNBElement: {
				alignSelf: CENTER,
				fontSize: 20,
				marginLeft: 0,
				marginRight: 0,
			},
		},
	}

	return fabTheme
}
