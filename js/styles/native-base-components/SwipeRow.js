/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")

module.exports = () => {
	return {
		"NativeBase.ListItem": {
			".list": {
				backgroundColor: "#FFF",
			},
			marginLeft: 0,
		},
		"NativeBase.Left": {
			flex: 0,
			alignSelf: null,
			alignItems: null,
			"NativeBase.Button": {
				flex: 1,
				alignItems: CENTER,
				justifyContent: CENTER,
				alignSelf: "stretch",
				borderRadius: 0,
			},
		},
		"NativeBase.Right": {
			flex: 0,
			alignSelf: null,
			alignItems: null,
			"NativeBase.Button": {
				flex: 1,
				alignItems: CENTER,
				justifyContent: CENTER,
				alignSelf: "stretch",
				borderRadius: 0,
			},
		},
		"NativeBase.Button": {
			flex: 1,
			height: null,
			alignItems: CENTER,
			justifyContent: CENTER,
			alignSelf: "stretch",
			borderRadius: 0,
		},
	}
}
