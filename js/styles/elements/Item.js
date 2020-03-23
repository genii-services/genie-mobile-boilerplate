/** Element Style */
const { CENTER, FLEX_START, ROW, TRANSPARENT } = require("/constants/style")
const { itsIOS, deviceWidth } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const itemTheme = {
		".floatingLabel": {
			"elements/Input": {
				height: 50,
				top: 8,
				paddingTop: 3,
				paddingBottom: 7,
				".multiline": {
					minHeight: theme.inputHeightBase,
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
				fontSize: theme.inputFontSize,
			},
			"elements/Input": {
				flex: 2,
				fontSize: theme.inputFontSize,
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
				fontSize: theme.inputFontSize - 2,
			},
			"elements/Icon": { marginTop: 36 },
			"elements/Input": {
				alignSelf: itsIOS ? "stretch" : FLEX_START,
				flex: 1,
				width: itsIOS ? null : deviceWidth - 25,
				fontSize: theme.inputFontSize,
				lineHeight: theme.inputLineHeight - 6,
				".secureTextEntry": { fontSize: theme.inputFontSize },
				".multiline": {
					paddingTop: itsIOS ? 9 : undefined,
					paddingBottom: itsIOS ? 9 : undefined,
				},
			},
			flexDirection: null,
			minHeight: theme.inputHeightBase + 15,
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
				fontSize: theme.inputFontSize,
			},
			"elements/Input": {
				paddingLeft: 5,
				fontSize: theme.inputFontSize,
			},
			flexDirection: ROW,
		},
		"elements/Label": {
			fontSize: theme.inputFontSize,
			color: theme.inputColorPlaceholder,
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
			height: theme.inputHeightBase,
			color: theme.inputColor,
			flex: 1,
			top: itsIOS ? 1.5 : undefined,
			fontSize: theme.inputFontSize,
		},
		".underline": {
			"elements/Input": {
				paddingLeft: 15,
			},
			".success": {
				borderColor: theme.inputSuccessBorderColor,
			},
			".error": {
				borderColor: theme.inputErrorBorderColor,
			},
			borderWidth: theme.borderWidth * 2,
			borderTopWidth: 0,
			borderRightWidth: 0,
			borderLeftWidth: 0,
			borderColor: theme.inputBorderColor,
		},
		".regular": {
			"elements/Input": {
				paddingLeft: 8,
			},
			"elements/Icon": {
				paddingLeft: 10,
			},
			".success": {
				borderColor: theme.inputSuccessBorderColor,
			},
			".error": {
				borderColor: theme.inputErrorBorderColor,
			},
			borderWidth: theme.borderWidth * 2,
			borderColor: theme.inputBorderColor,
		},
		".rounded": {
			"elements/Input": {
				paddingLeft: 8,
			},
			"elements/Icon": {
				paddingLeft: 10,
			},
			".success": {
				borderColor: theme.inputSuccessBorderColor,
			},
			".error": {
				borderColor: theme.inputErrorBorderColor,
			},
			borderWidth: theme.borderWidth * 2,
			borderRadius: 30,
			borderColor: theme.inputBorderColor,
		},

		".success": {
			"elements/Icon": {
				color: theme.inputSuccessBorderColor,
			},
			"elements/IconNB": {
				color: theme.inputSuccessBorderColor,
			},
			".rounded": {
				borderRadius: 30,
				borderColor: theme.inputSuccessBorderColor,
			},
			".regular": {
				borderColor: theme.inputSuccessBorderColor,
			},
			".underline": {
				borderWidth: theme.borderWidth * 2,
				borderTopWidth: 0,
				borderRightWidth: 0,
				borderLeftWidth: 0,
				borderColor: theme.inputSuccessBorderColor,
			},
			borderColor: theme.inputSuccessBorderColor,
		},

		".error": {
			"elements/Icon": {
				color: theme.inputErrorBorderColor,
			},
			"elements/IconNB": {
				color: theme.inputErrorBorderColor,
			},
			".rounded": {
				borderRadius: 30,
				borderColor: theme.inputErrorBorderColor,
			},
			".regular": {
				borderColor: theme.inputErrorBorderColor,
			},
			".underline": {
				borderWidth: theme.borderWidth * 2,
				borderTopWidth: 0,
				borderRightWidth: 0,
				borderLeftWidth: 0,
				borderColor: theme.inputErrorBorderColor,
			},
			borderColor: theme.inputErrorBorderColor,
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

		borderWidth: theme.borderWidth * 2,
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderColor: theme.inputBorderColor,
		backgroundColor: TRANSPARENT,
		flexDirection: ROW,
		alignItems: CENTER,
		marginLeft: 2,
	}

	return itemTheme
}
