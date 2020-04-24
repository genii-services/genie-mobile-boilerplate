/** Element Style */
const MODULE_NAME$ = "styles/elements/Footer"
console.debug(MODULE_NAME$)

const { CENTER, FLEX_START, FLEX_END, MATERIAL, ROW, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = (style) => {
	const { itsUnitedStyle } = style

	const IconElement = { color: style.tabBarActiveTextColor }

	const TextElement = { color: style.tabBarActiveTextColor }

	return {
		backgroundColor: style.footerDefaultBg,
		flexDirection: ROW,
		justifyContent: CENTER,
		borderTopWidth: itsIOS && !itsUnitedStyle && style.borderWidth,
		borderColor: itsIOS && !itsUnitedStyle && "#cbcbcb",
		height: style.footerHeight,
		paddingBottom: style.footerPaddingBottom,
		elevation: 3,
		left: 0,
		right: 0,

		LeftElement: {
			ButtonElement: {
				".transparent": {
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
					IconElement,
					TextElement,
				},
				alignSelf: null,
				IconElement,
				// TextElement
			},
			flex: 1,
			alignSelf: CENTER,
			alignItems: FLEX_START,
		},
		BodyElement: {
			flex: 1,
			alignItems: CENTER,
			alignSelf: CENTER,
			flexDirection: ROW,
			ButtonElement: {
				alignSelf: CENTER,
				".transparent": {
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
					IconElement,
					TextElement,
				},
				".full": {
					height: style.footerHeight,
					paddingBottom: style.footerPaddingBottom,
					flex: 1,
				},
				IconElement,
				// TextElement
			},
		},
		RightElement: {
			alignSelf: CENTER,
			alignItems: FLEX_END,
			flex: 1,
			ButtonElement: {
				".transparent": {
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
					IconElement,
					TextElement,
				},
				alignSelf: null,
				IconElement,
				// TextElement
			},
		},
	}
}
