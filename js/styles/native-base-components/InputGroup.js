/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const inputGroupTheme = {
		"NativeBase.Icon": {
			fontSize: 24,
			color: theme.sTabBarActiveTextColor,
			paddingHorizontal: 5,
		},
		"NativeBase.IconNB": {
			fontSize: 24,
			color: theme.sTabBarActiveTextColor,
			paddingHorizontal: 5,
		},
		"NativeBase.Input": {
			height: theme.inputHeightBase,
			color: theme.inputColor,
			paddingLeft: 5,
			paddingRight: 5,
			flex: 1,
			fontSize: theme.inputFontSize,
			lineHeight: theme.inputLineHeight,
		},
		".underline": {
			".success": {
				borderColor: theme.inputSuccessBorderColor,
			},
			".error": {
				borderColor: theme.inputErrorBorderColor,
			},
			paddingLeft: 5,
			borderWidth: theme.borderWidth,
			borderTopWidth: 0,
			borderRightWidth: 0,
			borderLeftWidth: 0,
			borderColor: theme.inputBorderColor,
		},
		".regular": {
			".success": {
				borderColor: theme.inputSuccessBorderColor,
			},
			".error": {
				borderColor: theme.inputErrorBorderColor,
			},
			paddingLeft: 5,
			borderWidth: theme.borderWidth,
			borderColor: theme.inputBorderColor,
		},
		".rounded": {
			".success": {
				borderColor: theme.inputSuccessBorderColor,
			},
			".error": {
				borderColor: theme.inputErrorBorderColor,
			},
			paddingLeft: 5,
			borderWidth: theme.borderWidth,
			borderRadius: theme.inputGroupRoundedBorderRadius,
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
				borderWidth: theme.borderWidth,
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
				borderWidth: theme.borderWidth,
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

		paddingLeft: 5,
		borderWidth: theme.borderWidth,
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderColor: theme.inputBorderColor,
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: CENTER,
	}

	return inputGroupTheme
}
