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

	const childrenDark = {
		TextElement: brandDark,
		IconElement: brandDark,
	}
	const childrenLight = {
		TextElement: brandLight,
		IconElement: brandLight,
	}
	const childrenPrimary = {
		TextElement: buttonPrimaryBg,
		IconElement: buttonPrimaryBg,
	}
	const childrenSuccess = {
		TextElement: buttonSuccessBg,
		IconElement: buttonSuccessBg,
	}
	const childrenInfo = {
		TextElement: buttonInfoBg,
		IconElement: buttonInfoBg,
	}
	const childrenWarning = {
		TextElement: buttonWarningBg,
		IconElement: buttonWarningBg,
	}
	const childrenDanger = {
		TextElement: buttonDangerBg,
		IconElement: buttonDangerBg,
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
			backgroundColor: style.buttonDisabledBg,
			".transparent": {
				backgroundColor: TRANSPARENT,
				TextElement: buttonDisabledBg,
				IconElement: buttonDisabledBg,
				IconNBElement: buttonDisabledBg,
			},
			IconElement: brandLight,
			IconNBElement: brandLight,
		},
		".bordered": {
			backgroundColor: TRANSPARENT,
			borderWidth: borderWidthX2,
			elevation: null,
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			shadowRadius: null,
			".dark": {
				backgroundColor: TRANSPARENT,
				borderColor: style.brandDark,
				borderWidth: borderWidthX2,
				...childrenDark,
			},
			".light": {
				backgroundColor: TRANSPARENT,
				borderColor: style.brandLight,
				borderWidth: borderWidthX2,
				...childrenLight,
			},
			".primary": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonPrimaryBg,
				borderWidth: borderWidthX2,
				...childrenPrimary,
			},
			".success": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonSuccessBg,
				borderWidth: borderWidthX2,
				...childrenSuccess,
			},
			".info": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonInfoBg,
				borderWidth: borderWidthX2,
				...childrenInfo,
			},
			".warning": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonWarningBg,
				borderWidth: borderWidthX2,
				...childrenWarning,
			},
			".danger": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDangerBg,
				borderWidth: borderWidthX2,
				...childrenDanger,
			},
			".disabled": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDisabledBg,
				borderWidth: borderWidthX2,
				TextElement: buttonDisabledBg,
			},
			...childrenPrimary,
		},

		".dark": {
			backgroundColor: style.brandDark,
			".bordered": childrenDark,
		},
		".light": {
			backgroundColor: style.brandLight,
			".transparent": {
				backgroundColor: TRANSPARENT,
				...childrenLight,
			},
			".bordered": childrenLight,
			...childrenDark,
		},

		".primary": {
			backgroundColor: style.buttonPrimaryBg,
			".bordered": childrenPrimary,
		},

		".success": {
			backgroundColor: style.buttonSuccessBg,
			".bordered": childrenSuccess,
		},

		".info": {
			backgroundColor: style.buttonInfoBg,
			".bordered": childrenInfo,
		},

		".warning": {
			backgroundColor: style.buttonWarningBg,
			".bordered": childrenWarning,
		},

		".danger": {
			backgroundColor: style.buttonDangerBg,
			".bordered": childrenDanger,
		},

		".block": {
			alignSelf: "stretch",
			justifyContent: CENTER,
		},

		".full": {
			alignSelf: "stretch",
			borderRadius: 0,
			justifyContent: CENTER,
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
			".dark": childrenDark,
			".danger": childrenDanger,
			".warning": childrenWarning,
			".info": childrenInfo,
			".primary": childrenPrimary,
			".success": childrenSuccess,
			".light": childrenLight,
			".disabled": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDisabledBg,
				borderWidth: borderWidthX2,
				TextElement: buttonDisabledBg,
				IconElement: buttonDisabledBg,
				IconNBElement: buttonDisabledBg,
			},
			...childrenPrimary,
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
			IconElement: {
				marginRight: 0,
				marginLeft: 16,
			},
			TextElement: {
				marginLeft: 0,
			},
		},
		".iconRight": {
			IconElement: {
				marginLeft: 0,
				marginRight: 16,
			},
			TextElement: {
				marginRight: 0,
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

		IconElement: {
			color: style.inverseTextColor,
			fontSize: 24,
			marginHorizontal: 16,
			paddingTop: itsIOS && 2,
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
	}
}
