/** Element Style */
const MODULE_NAME$ = "styles/elements/InputGroup"
console.debug(MODULE_NAME$)

const { CENTER, ROW, TRANSPARENT } = require("/constants/style")

module.exports = (style) => {
	return {
		IconElement: {
			fontSize: 24,
			color: style.sTabBarActiveTextColor,
			paddingHorizontal: 5,
		},
		IconNBElement: {
			fontSize: 24,
			color: style.sTabBarActiveTextColor,
			paddingHorizontal: 5,
		},
		InputElement: {
			height: style.inputHeightBase,
			color: style.inputColor,
			paddingLeft: 5,
			paddingRight: 5,
			flex: 1,
			fontSize: style.inputFontSize,
			lineHeight: style.inputLineHeight,
		},
		".underline": {
			".success": {
				borderColor: style.inputSuccessBorderColor,
			},
			".error": {
				borderColor: style.inputErrorBorderColor,
			},
			paddingLeft: 5,
			borderWidth: style.borderWidth,
			borderTopWidth: 0,
			borderRightWidth: 0,
			borderLeftWidth: 0,
			borderColor: style.inputBorderColor,
		},
		".regular": {
			".success": {
				borderColor: style.inputSuccessBorderColor,
			},
			".error": {
				borderColor: style.inputErrorBorderColor,
			},
			paddingLeft: 5,
			borderWidth: style.borderWidth,
			borderColor: style.inputBorderColor,
		},
		".rounded": {
			".success": {
				borderColor: style.inputSuccessBorderColor,
			},
			".error": {
				borderColor: style.inputErrorBorderColor,
			},
			paddingLeft: 5,
			borderWidth: style.borderWidth,
			borderRadius: style.inputGroupRoundedBorderRadius,
			borderColor: style.inputBorderColor,
		},

		".success": {
			IconElement: {
				color: style.inputSuccessBorderColor,
			},
			IconNBElement: {
				color: style.inputSuccessBorderColor,
			},
			".rounded": {
				borderRadius: 30,
				borderColor: style.inputSuccessBorderColor,
			},
			".regular": {
				borderColor: style.inputSuccessBorderColor,
			},
			".underline": {
				borderWidth: style.borderWidth,
				borderTopWidth: 0,
				borderRightWidth: 0,
				borderLeftWidth: 0,
				borderColor: style.inputSuccessBorderColor,
			},
			borderColor: style.inputSuccessBorderColor,
		},

		".error": {
			IconElement: {
				color: style.inputErrorBorderColor,
			},
			IconNBElement: {
				color: style.inputErrorBorderColor,
			},
			".rounded": {
				borderRadius: 30,
				borderColor: style.inputErrorBorderColor,
			},
			".regular": {
				borderColor: style.inputErrorBorderColor,
			},
			".underline": {
				borderWidth: style.borderWidth,
				borderTopWidth: 0,
				borderRightWidth: 0,
				borderLeftWidth: 0,
				borderColor: style.inputErrorBorderColor,
			},
			borderColor: style.inputErrorBorderColor,
		},
		".disabled": {
			IconElement: {
				color: "#384850",
			},
			IconNBElement: {
				color: "#384850",
			},
		},

		paddingLeft: 5,
		borderWidth: style.borderWidth,
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderColor: style.inputBorderColor,
		backgroundColor: TRANSPARENT,
		flexDirection: ROW,
		alignItems: CENTER,
	}
}
