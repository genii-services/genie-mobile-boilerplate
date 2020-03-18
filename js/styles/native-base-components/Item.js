/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")
const { itsIOS, deviceWidth } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const itemTheme = {
		".floatingLabel": {
			"NativeBase.Input": {
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
			"NativeBase.Label": {
				paddingTop: 5,
			},
			"NativeBase.Icon": {
				top: 6,
				paddingTop: 8,
			},
			"NativeBase.IconNB": {
				top: 6,
				paddingTop: 8,
			},
		},
		".fixedLabel": {
			"NativeBase.Label": {
				position: null,
				top: null,
				left: null,
				right: null,
				flex: 1,
				height: null,
				width: null,
				fontSize: theme.inputFontSize,
			},
			"NativeBase.Input": {
				flex: 2,
				fontSize: theme.inputFontSize,
			},
		},
		".stackedLabel": {
			"NativeBase.Label": {
				position: null,
				top: null,
				left: null,
				right: null,
				paddingTop: 5,
				alignSelf: "flex-start",
				fontSize: theme.inputFontSize - 2,
			},
			"NativeBase.Icon": {
				marginTop: 36,
			},
			"NativeBase.Input": {
				alignSelf: itsIOS ? "stretch" : "flex-start",
				flex: 1,
				width: itsIOS ? null : deviceWidth - 25,
				fontSize: theme.inputFontSize,
				lineHeight: theme.inputLineHeight - 6,
				".secureTextEntry": {
					fontSize: theme.inputFontSize,
				},
				".multiline": {
					paddingTop: itsIOS ? 9 : undefined,
					paddingBottom: itsIOS ? 9 : undefined,
				},
			},
			flexDirection: null,
			minHeight: theme.inputHeightBase + 15,
		},
		".inlineLabel": {
			"NativeBase.Label": {
				position: null,
				top: null,
				left: null,
				right: null,
				paddingRight: 20,
				height: null,
				width: null,
				fontSize: theme.inputFontSize,
			},
			"NativeBase.Input": {
				paddingLeft: 5,
				fontSize: theme.inputFontSize,
			},
			flexDirection: "row",
		},
		"NativeBase.Label": {
			fontSize: theme.inputFontSize,
			color: theme.inputColorPlaceholder,
			paddingRight: 5,
		},
		"NativeBase.Icon": {
			fontSize: 24,
			paddingRight: 8,
		},
		"NativeBase.IconNB": {
			fontSize: 24,
			paddingRight: 8,
		},
		"NativeBase.Input": {
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
			"NativeBase.Input": {
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
			"NativeBase.Input": {
				paddingLeft: 8,
			},
			"NativeBase.Icon": {
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
			"NativeBase.Input": {
				paddingLeft: 8,
			},
			"NativeBase.Icon": {
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
			"NativeBase.Icon": {
				color: theme.inputSuccessBorderColor,
			},
			"NativeBase.IconNB": {
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
			"NativeBase.Icon": {
				color: theme.inputErrorBorderColor,
			},
			"NativeBase.IconNB": {
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
			"NativeBase.Icon": {
				color: "#384850",
			},
			"NativeBase.IconNB": {
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
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: CENTER,
		marginLeft: 2,
	}

	return itemTheme
}
