/** Element Style */
const MODULE_NAME$ = "styles/elements/Card"
console.debug(MODULE_NAME$)

const { BLACK, FLEX_START, FLEX_END, NOWRAP, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")

module.exports = (style) => {
	const {
		borderWidth: borderWidth,
		cardBorderRadius: borderRadius,
		cardBorderColor: borderColor,
		cardDefaultBg: backgroundColor,
	} = style

	return {
		marginVertical: 5,
		marginHorizontal: 2,
		borderWidth,
		borderRadius,
		borderColor,
		flexWrap: NOWRAP,
		backgroundColor,
		shadowColor: BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,

		".transparent": {
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			shadowRadius: null,
			elevation: null,
			backgroundColor: TRANSPARENT,
			borderWidth: 0,
		},
		".noShadow": {
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			elevation: null,
		},
	}
}
