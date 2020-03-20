/** 공통 라이브러리 */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const {
		borderWidth: borderWidth,
		cardBorderRadius: borderRadius,
		cardBorderColor: borderColor,
		cardDefaultBg: backgroundColor,
	} = theme

	return {
		".transparent": {
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			shadowRadius: null,
			elevation: null,
			backgroundColor: "transparent",
			borderWidth: 0,
		},
		".noShadow": {
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			elevation: null,
		},
		marginVertical: 5,
		marginHorizontal: 2,
		borderWidth,
		borderRadius,
		borderColor,
		flexWrap: "nowrap",
		backgroundColor,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
	}
}
