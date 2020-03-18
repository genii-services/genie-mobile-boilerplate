/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")

module.exports = () => {
	return {
		"NativeBase.Button": {
			alignSelf: null,
		},
		flex: 1,
		alignSelf: CENTER,
		alignItems: "flex-end",
	}
}
