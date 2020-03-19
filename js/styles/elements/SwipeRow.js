/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")

module.exports = () => {
	return {
		"elements/ListItem": {
			".list": {
				backgroundColor: "#FFF",
			},
			marginLeft: 0,
		},
		"elements/Left": {
			flex: 0,
			alignSelf: null,
			alignItems: null,
			"elements/Button": {
				flex: 1,
				alignItems: CENTER,
				justifyContent: CENTER,
				alignSelf: "stretch",
				borderRadius: 0,
			},
		},
		"elements/Right": {
			flex: 0,
			alignSelf: null,
			alignItems: null,
			"elements/Button": {
				flex: 1,
				alignItems: CENTER,
				justifyContent: CENTER,
				alignSelf: "stretch",
				borderRadius: 0,
			},
		},
		"elements/Button": {
			flex: 1,
			height: null,
			alignItems: CENTER,
			justifyContent: CENTER,
			alignSelf: "stretch",
			borderRadius: 0,
		},
	}
}
