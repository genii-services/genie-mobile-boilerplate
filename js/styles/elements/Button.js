/** Element Style */
const { CENTER, COLUMN, FLEX_END, MATERIAL, ROW, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
	const { borderWidth, platformStyle } = style
	const borderWidthX2 = borderWidth * 2
	const commonDark = {
		TextElement: { color: style.brandDark },
		IconElement: { color: style.brandDark },
		IconNBElement: { color: style.brandDark },
	}
	const commonLight = {
		TextElement: { color: style.brandLight },
		IconElement: { color: style.brandLight },
		IconNBElement: { color: style.brandLight },
	}
	const commonPrimary = {
		TextElement: { color: style.buttonPrimaryBg },
		IconElement: { color: style.buttonPrimaryBg },
		IconNBElement: { color: style.buttonPrimaryBg },
	}
	const commonSuccess = {
		TextElement: { color: style.buttonSuccessBg },
		IconElement: { color: style.buttonSuccessBg },
		IconNBElement: { color: style.buttonSuccessBg },
	}
	const commonInfo = {
		TextElement: { color: style.buttonInfoBg },
		IconElement: { color: style.buttonInfoBg },
		IconNBElement: { color: style.buttonInfoBg },
	}
	const commonWarning = {
		TextElement: { color: style.buttonWarningBg },
		IconElement: { color: style.buttonWarningBg },
		IconNBElement: { color: style.buttonWarningBg },
	}
	const commonDanger = {
		TextElement: { color: style.buttonDangerBg },
		IconElement: { color: style.buttonDangerBg },
		IconNBElement: { color: style.buttonDangerBg },
	}
	return {
		".disabled": {
			".transparent": {
				backgroundColor: TRANSPARENT,
				TextElement: {
					color: style.buttonDisabledBg,
				},
				IconElement: {
					color: style.buttonDisabledBg,
				},
				IconNBElement: {
					color: style.buttonDisabledBg,
				},
			},
			IconElement: { color: style.brandLight },
			IconNBElement: { color: style.brandLight },
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
				TextElement: {
					color: style.buttonDisabledBg,
				},
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
			".bordered": {
				...commonDark,
			},
			backgroundColor: style.brandDark,
		},
		".light": {
			".transparent": {
				...commonLight,
				backgroundColor: TRANSPARENT,
			},
			".bordered": {
				...commonLight,
			},
			...commonDark,
			backgroundColor: style.brandLight,
		},

		".primary": {
			".bordered": {
				...commonPrimary,
			},
			backgroundColor: style.buttonPrimaryBg,
		},

		".success": {
			".bordered": {
				...commonSuccess,
			},
			backgroundColor: style.buttonSuccessBg,
		},

		".info": {
			".bordered": {
				...commonInfo,
			},
			backgroundColor: style.buttonInfoBg,
		},

		".warning": {
			".bordered": {
				...commonWarning,
			},
			backgroundColor: style.buttonWarningBg,
		},

		".danger": {
			".bordered": {
				...commonDanger,
			},
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
			".dark": {
				...commonDark,
			},
			".danger": {
				...commonDanger,
			},
			".warning": {
				...commonWarning,
			},
			".info": {
				...commonInfo,
			},
			".primary": {
				...commonPrimary,
			},
			".success": {
				...commonSuccess,
			},
			".light": {
				...commonLight,
			},
			".disabled": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDisabledBg,
				borderWidth: borderWidthX2,
				TextElement: {
					color: style.buttonDisabledBg,
				},
				IconElement: {
					color: style.buttonDisabledBg,
				},
				IconNBElement: {
					color: style.buttonDisabledBg,
				},
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
		IconNBElement: {
			color: style.inverseTextColor,
			fontSize: 24,
			marginHorizontal: 16,
			paddingTop: itsIOS && 2,
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
		paddingVertical: style.buttonPadding,
		backgroundColor: style.buttonPrimaryBg,
		borderRadius: style.borderRadiusBase,
		borderColor: style.buttonPrimaryBg,
		borderWidth: null,
		height: 45,
		flexDirection: ROW,
		elevation: 2,
		shadowColor: platformStyle === MATERIAL && style.brandDark,
		shadowOffset: platformStyle === MATERIAL && { width: 0, height: 2 },
		shadowOpacity: platformStyle === MATERIAL && 0.2,
		shadowRadius: platformStyle === MATERIAL && 1.2,
		alignItems: CENTER,
		justifyContent: SPACE_BETWEEN,
	}
}
