/** Element Style */
const { CENTER } = require("/constants/style")

module.exports = () => {
	const fabTheme = {
		"elements/Button": {
			alignItems: CENTER,
			padding: null,
			justifyContent: CENTER,
			"elements/Icon": {
				alignSelf: CENTER,
				fontSize: 20,
				marginLeft: 0,
				marginRight: 0,
			},
			"elements/IconNB": {
				alignSelf: CENTER,
				fontSize: 20,
				marginLeft: 0,
				marginRight: 0,
			},
		},
	}

	return fabTheme
}
