/** Element Style */
const { CENTER, FLEX_START, ROW, TRANSPARENT } = require("/constants/style")
const { itsIOS, deviceWidth } = require("/utils/device")

module.exports = style => {
	return {
		".floatingLabel": {
			"elements/Input": {
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
			"elements/Label": { paddingTop: 5 },
			"elements/Icon": { top: 6, paddingTop: 8 },
			"elements/IconNB": { top: 6, paddingTop: 8 },
		},
		".fixedLabel": {
			"elements/Label": {
				position: null,
				top: null,
				left: null,
				right: null,
				flex: 1,
				height: null,
				width: null,
				fontSize: style.inputFontSize,
			},
			"elements/Input": {
				flex: 2,
				fontSize: style.inputFontSize,
			},
		},
		".stackedLabel": {
			"elements/Label": {
				position: null,
				top: null,
				left: null,
				right: null,
				paddingTop: 5,
				alignSelf: FLEX_START,
				fontSize: style.inputFontSize - 2,
			},
			"elements/Icon": { marginTop: 36 },
			"elements/Input": {
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
			"elements/Label": {
				position: null,
				top: null,
				left: null,
				right: null,
				paddingRight: 20,
				height: null,
				width: null,
				fontSize: style.inputFontSize,
			},
			"elements/Input": {
				paddingLeft: 5,
				fontSize: style.inputFontSize,
			},
			flexDirection: ROW,
		},
		"elements/Label": {
			fontSize: style.inputFontSize,
			color: style.placeholderTextColor,
			paddingRight: 5,
		},
		"elements/Icon": {
			fontSize: 24,
			paddingRight: 8,
		},
		"elements/IconNB": {
			fontSize: 24,
			paddingRight: 8,
		},
		"elements/Input": {
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
			"elements/Input": {
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
			"elements/Input": {
				paddingLeft: 8,
			},
			"elements/Icon": {
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
			"elements/Input": {
				paddingLeft: 8,
			},
			"elements/Icon": {
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
			"elements/Icon": {
				color: style.inputSuccessBorderColor,
			},
			"elements/IconNB": {
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
			"elements/Icon": {
				color: style.inputErrorBorderColor,
			},
			"elements/IconNB": {
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
			"elements/Icon": {
				color: "#384850",
			},
			"elements/IconNB": {
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
