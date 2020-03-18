/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")

module.exports = () => {
	const fabTheme = {
		"NativeBase.Button": {
			alignItems: CENTER,
			padding: null,
			justifyContent: CENTER,
			"NativeBase.Icon": {
				alignSelf: CENTER,
				fontSize: 20,
				marginLeft: 0,
				marginRight: 0,
			},
			"NativeBase.IconNB": {
				alignSelf: CENTER,
				fontSize: 20,
				marginLeft: 0,
				marginRight: 0,
			},
		},
	}

	return fabTheme
}
