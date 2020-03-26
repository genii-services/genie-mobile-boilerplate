/** Tab Element Style */
const { CENTER, WHITE } = require("/constants/style")

module.exports = () => {
	return {
		ListItemElement: {
			".list": {
				backgroundColor: WHITE,
			},
			marginLeft: 0,
		},
		LeftElement: {
			flex: 0,
			alignSelf: null,
			alignItems: null,
			ButtonElement: {
				flex: 1,
				alignItems: CENTER,
				justifyContent: CENTER,
				alignSelf: "stretch",
				borderRadius: 0,
			},
		},
		RightElement: {
			flex: 0,
			alignSelf: null,
			alignItems: null,
			ButtonElement: {
				flex: 1,
				alignItems: CENTER,
				justifyContent: CENTER,
				alignSelf: "stretch",
				borderRadius: 0,
			},
		},
		ButtonElement: {
			flex: 1,
			height: null,
			alignItems: CENTER,
			justifyContent: CENTER,
			alignSelf: "stretch",
			borderRadius: 0,
		},
	}
}
