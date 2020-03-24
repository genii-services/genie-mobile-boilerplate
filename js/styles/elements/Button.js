/** Element Style */
const { CENTER, COLUMN, FLEX_END, MATERIAL, ROW, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	const { borderWidth, platformStyle } = style
	const borderWidthX2 = borderWidth * 2
	const darkCommon = {
		"elements/Text": { color: style.brandDark },
		"elements/Icon": { color: style.brandDark },
		"elements/IconNB": { color: style.brandDark },
	}
	const lightCommon = {
		"elements/Text": { color: style.brandLight },
		"elements/Icon": { color: style.brandLight },
		"elements/IconNB": { color: style.brandLight },
	}
	const primaryCommon = {
		"elements/Text": { color: style.buttonPrimaryBg },
		"elements/Icon": { color: style.buttonPrimaryBg },
		"elements/IconNB": { color: style.buttonPrimaryBg },
	}
	const successCommon = {
		"elements/Text": { color: style.buttonSuccessBg },
		"elements/Icon": { color: style.buttonSuccessBg },
		"elements/IconNB": { color: style.buttonSuccessBg },
	}
	const infoCommon = {
		"elements/Text": { color: style.buttonInfoBg },
		"elements/Icon": { color: style.buttonInfoBg },
		"elements/IconNB": { color: style.buttonInfoBg },
	}
	const warningCommon = {
		"elements/Text": { color: style.buttonWarningBg },
		"elements/Icon": { color: style.buttonWarningBg },
		"elements/IconNB": { color: style.buttonWarningBg },
	}
	const dangerCommon = {
		"elements/Text": { color: style.buttonDangerBg },
		"elements/Icon": { color: style.buttonDangerBg },
		"elements/IconNB": { color: style.buttonDangerBg },
	}
	return {
		".disabled": {
			".transparent": {
				backgroundColor: TRANSPARENT,
				"elements/Text": { color: style.buttonDisabledBg },
				"elements/Icon": { color: style.buttonDisabledBg },
				"elements/IconNB": { color: style.buttonDisabledBg },
			},
			"elements/Icon": { color: style.brandLight },
			"elements/IconNB": { color: style.brandLight },
			backgroundColor: style.buttonDisabledBg,
		},
		".bordered": {
			".dark": {
				...darkCommon,
				backgroundColor: TRANSPARENT,
				borderColor: style.brandDark,
				borderWidth: borderWidthX2,
			},
			".light": {
				...lightCommon,
				backgroundColor: TRANSPARENT,
				borderColor: style.brandLight,
				borderWidth: borderWidthX2,
			},
			".primary": {
				...primaryCommon,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonPrimaryBg,
				borderWidth: borderWidthX2,
			},
			".success": {
				...successCommon,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonSuccessBg,
				borderWidth: borderWidthX2,
			},
			".info": {
				...infoCommon,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonInfoBg,
				borderWidth: borderWidthX2,
			},
			".warning": {
				...warningCommon,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonWarningBg,
				borderWidth: borderWidthX2,
			},
			".danger": {
				...dangerCommon,
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDangerBg,
				borderWidth: borderWidthX2,
			},
			".disabled": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDisabledBg,
				borderWidth: borderWidthX2,
				"elements/Text": {
					color: style.buttonDisabledBg,
				},
			},
			...primaryCommon,
			borderWidth: borderWidthX2,
			elevation: null,
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			shadowRadius: null,
			backgroundColor: TRANSPARENT,
		},

		".dark": {
			".bordered": { ...darkCommon },
			backgroundColor: style.brandDark,
		},
		".light": {
			".transparent": { ...lightCommon, backgroundColor: TRANSPARENT },
			".bordered": { ...lightCommon },
			...darkCommon,
			backgroundColor: style.brandLight,
		},

		".primary": {
			".bordered": { ...primaryCommon },
			backgroundColor: style.buttonPrimaryBg,
		},

		".success": {
			".bordered": { ...successCommon },
			backgroundColor: style.buttonSuccessBg,
		},

		".info": {
			".bordered": { ...infoCommon },
			backgroundColor: style.buttonInfoBg,
		},

		".warning": {
			".bordered": { ...warningCommon },
			backgroundColor: style.buttonWarningBg,
		},

		".danger": {
			".bordered": { ...dangerCommon },
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
			...primaryCommon,
			".dark": { ...darkCommon },
			".danger": { ...dangerCommon },
			".warning": { ...warningCommon },
			".info": { ...infoCommon },
			".primary": { ...primaryCommon },
			".success": { ...successCommon },
			".light": { ...lightCommon },
			".disabled": {
				backgroundColor: TRANSPARENT,
				borderColor: style.buttonDisabledBg,
				borderWidth: borderWidthX2,
				"elements/Text": { color: style.buttonDisabledBg },
				"elements/Icon": { color: style.buttonDisabledBg },
				"elements/IconNB": { color: style.buttonDisabledBg },
			},
		},

		".small": {
			height: 30,
			"elements/Text": { fontSize: 14 },
			"elements/Icon": { fontSize: 20, paddingTop: 0 },
			"elements/IconNB": { fontSize: 20, paddingTop: 0 },
		},

		".large": {
			height: 60,
			"elements/Text": { fontSize: 22 },
		},

		".capitalize": {},

		".vertical": {
			flexDirection: COLUMN,
			height: null,
		},

		"elements/Text": {
			fontFamily: style.buttonFontFamily,
			marginLeft: 0,
			marginRight: 0,
			color: style.inverseTextColor,
			fontSize: style.buttonTextSize,
			paddingHorizontal: 16,
			backgroundColor: TRANSPARENT,
		},

		"elements/Icon": {
			color: style.inverseTextColor,
			fontSize: 24,
			marginHorizontal: 16,
			paddingTop: itsIOS && 2,
		},
		"elements/IconNB": {
			color: style.inverseTextColor,
			fontSize: 24,
			marginHorizontal: 16,
			paddingTop: itsIOS && 2,
		},

		".iconLeft": {
			"elements/Text": { marginLeft: 0 },
			"elements/IconNB": { marginRight: 0, marginLeft: 16 },
			"elements/Icon": { marginRight: 0, marginLeft: 16 },
		},
		".iconRight": {
			"elements/Text": { marginRight: 0 },
			"elements/IconNB": { marginLeft: 0, marginRight: 16 },
			"elements/Icon": { marginLeft: 0, marginRight: 16 },
		},
		".picker": {
			"elements/Text": {
				".note": { fontSize: 16, lineHeight: null },
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
