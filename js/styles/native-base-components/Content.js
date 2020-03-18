/** 공통 라이브러리 */

const { TRANSPARENT } = require("/constants/style")

module.exports = () => {
	return {
		flex: 1,
		backgroundColor: TRANSPARENT,
		"NativeBase.Segment": {
			borderWidth: 0,
			backgroundColor: TRANSPARENT,
		},
	}
}
