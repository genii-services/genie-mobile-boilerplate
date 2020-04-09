/** Element Style */
const MODULE_NAME$ = "styles/elements/Item"
console.debug(MODULE_NAME$)

const { CENTER, FLEX_START, ROW, TRANSPARENT } = require("/constants/style")
const { itsIOS, deviceWidth } = require("/utils/device")

module.exports = (style) => {
	return {
		".floatingLabel": {
			InputElement: {
				height: 50,
				top: 8,
				paddingTop: 3,
				paddingBottom: 7,
				".multiline": {
					minHeight: style.inputHeightBase,
					paddingTop: itsIOS ? 10 : 3,
					paddingBottom: itsIOS ? 14 : 10,
				},
			},
			LabelElement: { paddingTop: 5 },
			IconElement: { top: 6, paddingTop: 8 },
			IconNBElement: { top: 6, paddingTop: 8 },
		},
		".fixedLabel": {
			LabelElement: {
				position: null,
				top: null,
				left: null,
				right: null,
				flex: 1,
				height: null,
				width: null,
				fontSize: style.inputFontSize,
			},
			InputElement: {
				flex: 2,
				fontSize: style.inputFontSize,
			},
		},
		".stackedLabel": {
			LabelElement: {
				position: null,
				top: null,
				left: null,
				right: null,
				paddingTop: 5,
				alignSelf: FLEX_START,
				fontSize: style.inputFontSize - 2,
			},
			IconElement: { marginTop: 36 },
			InputElement: {
				alignSelf: itsIOS ? "stretch" : FLEX_START,
				flex: 1,
				width: itsIOS ? null : deviceWidth - 25,
				fontSize: style.inputFontSize,
				lineHeight: style.inputLineHeight - 6,
				".secureTextEntry": { fontSize: style.inputFontSize },
				".multiline": {
					paddingTop: itsIOS && 9,
					paddingBottom: itsIOS && 9,
				},
			},
			flexDirection: null,
			minHeight: style.inputHeightBase + 15,
		},
		".inlineLabel": {
			LabelElement: {
				position: null,
				top: null,
				left: null,
				right: null,
				paddingRight: 20,
				height: null,
				width: null,
				fontSize: style.inputFontSize,
			},
			InputElement: {
				paddingLeft: 5,
				fontSize: style.inputFontSize,
			},
			flexDirection: ROW,
		},
		LabelElement: {
			fontSize: style.inputFontSize,
			color: style.placeholderTextColor,
			paddingRight: 5,
		},
		IconElement: {
			fontSize: 24,
			paddingRight: 8,
		},
		IconNBElement: {
			fontSize: 24,
			paddingRight: 8,
		},
		InputElement: {
			".multiline": {
				height: null,
			},
			height: style.inputHeightBase,
			color: style.inputColor,
			flex: 1,
			top: itsIOS && 1.5,
			fontSize: style.inputFontSize,
		},
		".underline": {
			InputElement: {
				paddingLeft: 15,
			},
			".success": {
				borderColor: style.inputSuccessBorderColor,
			},
			".error": {
				borderColor: style.inputErrorBorderColor,
			},
			borderWidth: style.borderWidth * 2,
			borderTopWidth: 0,
			borderRightWidth: 0,
			borderLeftWidth: 0,
			borderColor: style.inputBorderColor,
		},
		".regular": {
			InputElement: {
				paddingLeft: 8,
			},
			IconElement: {
				paddingLeft: 10,
			},
			".success": {
				borderColor: style.inputSuccessBorderColor,
			},
			".error": {
				borderColor: style.inputErrorBorderColor,
			},
			borderWidth: style.borderWidth * 2,
			borderColor: style.inputBorderColor,
		},
		".rounded": {
			InputElement: {
				paddingLeft: 8,
			},
			IconElement: {
				paddingLeft: 10,
			},
			".success": {
				borderColor: style.inputSuccessBorderColor,
			},
			".error": {
				borderColor: style.inputErrorBorderColor,
			},
			borderWidth: style.borderWidth * 2,
			borderRadius: 30,
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
				borderWidth: style.borderWidth * 2,
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
				borderWidth: style.borderWidth * 2,
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
		".picker": {
			marginLeft: 0,
		},

		borderWidth: style.borderWidth * 2,
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderColor: style.inputBorderColor,
		backgroundColor: TRANSPARENT,
		flexDirection: ROW,
		alignItems: CENTER,
		marginLeft: 2,
	}
}
