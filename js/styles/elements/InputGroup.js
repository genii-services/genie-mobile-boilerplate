/** Element Style */
const { CENTER, ROW, TRANSPARENT } = require("/constants/style")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const inputGroupTheme = {
		"elements/Icon": {
			fontSize: 24,
			color: theme.sTabBarActiveTextColor,
			paddingHorizontal: 5,
		},
		"elements/IconNB": {
			fontSize: 24,
			color: theme.sTabBarActiveTextColor,
			paddingHorizontal: 5,
		},
		"elements/Input": {
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
				borderWidth: theme.borderWidth,
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
				borderWidth: theme.borderWidth,
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

		paddingLeft: 5,
		borderWidth: theme.borderWidth,
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderColor: theme.inputBorderColor,
		backgroundColor: TRANSPARENT,
		flexDirection: ROW,
		alignItems: CENTER,
	}

	return inputGroupTheme
}
