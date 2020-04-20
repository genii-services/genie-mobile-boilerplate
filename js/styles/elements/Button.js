/** Element Style */
const MODULE_NAME$ = "styles/elements/Button"
console.debug(MODULE_NAME$)

const { CENTER, COLUMN, FLEX_END, MATERIAL, ROW, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = (style) => {
	const { borderWidth } = style
	const itsMaterial = style.name === MATERIAL
	const borderWidthX2 = borderWidth * 2

	const brandDark = { color: style.brandDark }
	const brandLight = { color: style.brandLight }
	const buttonPrimaryBg = { color: style.buttonPrimaryBg }
	const buttonSuccessBg = { color: style.buttonSuccessBg }
	const buttonInfoBg = { color: style.buttonInfoBg }
	const buttonWarningBg = { color: style.buttonWarningBg }
	const buttonDangerBg = { color: style.buttonDangerBg }
	const buttonDisabledBg = { color: style.buttonDisabledBg }

	const commonDark = {
		TextElement: brandDark,
		IconElement: brandDark,
		IconNBElement: brandDark,
	}
	const commonLight = {
		TextElement: brandLight,
		IconElement: brandLight,
		IconNBElement: brandLight,
	}
	const commonPrimary = {
		TextElement: buttonPrimaryBg,
		IconElement: buttonPrimaryBg,
		IconNBElement: buttonPrimaryBg,
	}
	const commonSuccess = {
		TextElement: buttonSuccessBg,
		IconElement: buttonSuccessBg,
		IconNBElement: buttonSuccessBg,
	}
	const commonInfo = {
		TextElement: buttonInfoBg,
		IconElement: buttonInfoBg,
		IconNBElement: buttonInfoBg,
	}
	const commonWarning = {
		TextElement: buttonWarningBg,
		IconElement: buttonWarningBg,
		IconNBElement: buttonWarningBg,
	}
	const commonDanger = {
		TextElement: buttonDangerBg,
		IconElement: buttonDangerBg,
		IconNBElement: buttonDangerBg,
	}
	return {
		paddingVertical: style.buttonPadding,
		backgroundColor: style.buttonPrimaryBg,
		borderRadius: style.borderRadiusBase,
		borderColor: style.buttonPrimaryBg,
		borderWidth: null,
		height: 45,
		flexDirection: ROW,
		elevation: 2,
		shadowColor: itsMaterial && style.brandDark,
		shadowOffset: itsMaterial && { width: 0, height: 2 },
		shadowOpacity: itsMaterial && 0.2,
		shadowRadius: itsMaterial && 1.2,
		alignItems: CENTER,
		justifyContent: SPACE_BETWEEN,

		".disabled": {
			".transparent": {
				backgroundColor: TRANSPARENT,
				TextElement: buttonDisabledBg,
				IconElement: buttonDisabledBg,
				IconNBElement: buttonDisabledBg,
			},
			IconElement: brandLight,
			IconNBElement: brandLight,
			backgroundColor: style.buttonDisabledBg,
		},
		".bordered": {
			".dark": {
				...commonDark,
				backgroundColor: TRANSPARENT,
				borderColor: style.brandDark,
				borderWidth: borderWidthX2,
			},
			".light": {
				...commonLight,
				backgroundColor: TRANSPARENT,
				borderColor: style.brandLight,
				borderWidth: borderWidthX2,
			},
			".primary": {
				...commonPrimary,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonPrimaryBg,
				borderWidth: borderWidthX2,
			},
			".success": {
				...commonSuccess,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonSuccessBg,
				borderWidth: borderWidthX2,
			},
			".info": {
				...commonInfo,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonInfoBg,
				borderWidth: borderWidthX2,
			},
			".warning": {
				...commonWarning,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonWarningBg,
				borderWidth: borderWidthX2,
			},
			".danger": {
				...commonDanger,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDangerBg,
				borderWidth: borderWidthX2,
			},
			".disabled": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDisabledBg,
				borderWidth: borderWidthX2,
				TextElement: buttonDisabledBg,
			},
			...commonPrimary,
			borderWidth: borderWidthX2,
			elevation: null,
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			shadowRadius: null,
			backgroundColor: TRANSPARENT,
		},

		".dark": {
			".bordered": commonDark,
			backgroundColor: style.brandDark,
		},
		".light": {
			".transparent": {
				...commonLight,
				backgroundColor: TRANSPARENT,
			},
			".bordered": commonLight,
			...commonDark,
			backgroundColor: style.brandLight,
		},

		".primary": {
			".bordered": commonPrimary,
			backgroundColor: style.buttonPrimaryBg,
		},

		".success": {
			".bordered": commonSuccess,
			backgroundColor: style.buttonSuccessBg,
		},

		".info": {
			".bordered": commonInfo,
			backgroundColor: style.buttonInfoBg,
		},

		".warning": {
			".bordered": commonWarning,
			backgroundColor: style.buttonWarningBg,
		},

		".danger": {
			".bordered": commonDanger,
			backgroundColor: style.buttonDangerBg,
		},

		".block": {
			justifyContent: CENTER,
			alignSelf: "stretch",
		},

		".full": {
			justifyContent: CENTER,
			alignSelf: "stretch",
			borderRadius: 0,
		},

		".rounded": {
			borderRadius: style.borderRadiusLarge,
		},

		".transparent": {
			backgroundColor: TRANSPARENT,
			elevation: 0,
			shadowColor: null,
			shadowOffset: null,
			shadowRadius: null,
			shadowOpacity: null,
			...commonPrimary,
			".dark": commonDark,
			".danger": commonDanger,
			".warning": commonWarning,
			".info": commonInfo,
			".primary": commonPrimary,
			".success": commonSuccess,
			".light": commonLight,
			".disabled": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDisabledBg,
				borderWidth: borderWidthX2,
				TextElement: buttonDisabledBg,
				IconElement: buttonDisabledBg,
				IconNBElement: buttonDisabledBg,
			},
		},

		".small": {
			height: 30,
			TextElement: {
				fontSize: 14,
			},
			IconElement: {
				fontSize: 20,
				paddingTop: 0,
			},
			IconNBElement: {
				fontSize: 20,
				paddingTop: 0,
			},
		},

		".large": {
			height: 60,
			TextElement: {
				fontSize: 22,
			},
		},

		".capitalize": {},

		".vertical": {
			flexDirection: COLUMN,
			height: null,
		},

		".iconLeft": {
			TextElement: {
				marginLeft: 0,
			},
			IconNBElement: {
				marginRight: 0,
				marginLeft: 16,
			},
			IconElement: {
				marginRight: 0,
				marginLeft: 16,
			},
		},
		".iconRight": {
			TextElement: {
				marginRight: 0,
			},
			IconNBElement: {
				marginLeft: 0,
				marginRight: 16,
			},
			IconElement: {
				marginLeft: 0,
				marginRight: 16,
			},
		},
		".picker": {
			TextElement: {
				".note": {
					fontSize: 16,
					lineHeight: null,
				},
			},
		},

		TextElement: {
			fontFamily: style.buttonFontFamily,
			marginLeft: 0,
			marginRight: 0,
			color: style.inverseTextColor,
			fontSize: style.buttonTextSize,
			paddingHorizontal: 16,
			backgroundColor: TRANSPARENT,
		},

		IconElement: {
			color: style.inverseTextColor,
			fontSize: 24,
			marginHorizontal: 16,
			paddingTop: itsIOS && 2,
		},
	}
}
