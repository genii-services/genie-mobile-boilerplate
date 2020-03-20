/** 공통 라이브러리 */
const { CENTER, MATERIAL } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const { borderWidth, platformStyle } = theme
	const borderWidthX2 = borderWidth * 2
	const darkCommon = {
		"elements/Text": { color: theme.brandDark },
		"elements/Icon": { color: theme.brandDark },
		"elements/IconNB": { color: theme.brandDark },
	}
	const lightCommon = {
		"elements/Text": { color: theme.brandLight },
		"elements/Icon": { color: theme.brandLight },
		"elements/IconNB": { color: theme.brandLight },
	}
	const primaryCommon = {
		"elements/Text": { color: theme.buttonPrimaryBg },
		"elements/Icon": { color: theme.buttonPrimaryBg },
		"elements/IconNB": { color: theme.buttonPrimaryBg },
	}
	const successCommon = {
		"elements/Text": { color: theme.buttonSuccessBg },
		"elements/Icon": { color: theme.buttonSuccessBg },
		"elements/IconNB": { color: theme.buttonSuccessBg },
	}
	const infoCommon = {
		"elements/Text": { color: theme.buttonInfoBg },
		"elements/Icon": { color: theme.buttonInfoBg },
		"elements/IconNB": { color: theme.buttonInfoBg },
	}
	const warningCommon = {
		"elements/Text": { color: theme.buttonWarningBg },
		"elements/Icon": { color: theme.buttonWarningBg },
		"elements/IconNB": { color: theme.buttonWarningBg },
	}
	const dangerCommon = {
		"elements/Text": { color: theme.buttonDangerBg },
		"elements/Icon": { color: theme.buttonDangerBg },
		"elements/IconNB": { color: theme.buttonDangerBg },
	}
	const buttonTheme = {
		".disabled": {
			".transparent": {
				backgroundColor: "transparent",
				"elements/Text": { color: theme.buttonDisabledBg },
				"elements/Icon": { color: theme.buttonDisabledBg },
				"elements/IconNB": { color: theme.buttonDisabledBg },
			},
			"elements/Icon": { color: theme.brandLight },
			"elements/IconNB": { color: theme.brandLight },
			backgroundColor: theme.buttonDisabledBg,
		},
		".bordered": {
			".dark": {
				...darkCommon,
				backgroundColor: "transparent",
				borderColor: theme.brandDark,
				borderWidth: borderWidthX2,
			},
			".light": {
				...lightCommon,
				backgroundColor: "transparent",
				borderColor: theme.brandLight,
				borderWidth: borderWidthX2,
			},
			".primary": {
				...primaryCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonPrimaryBg,
				borderWidth: borderWidthX2,
			},
			".success": {
				...successCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonSuccessBg,
				borderWidth: borderWidthX2,
			},
			".info": {
				...infoCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonInfoBg,
				borderWidth: borderWidthX2,
			},
			".warning": {
				...warningCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonWarningBg,
				borderWidth: borderWidthX2,
			},
			".danger": {
				...dangerCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonDangerBg,
				borderWidth: borderWidthX2,
			},
			".disabled": {
				backgroundColor: "transparent",
				borderColor: theme.buttonDisabledBg,
				borderWidth: borderWidthX2,
				"elements/Text": {
					color: theme.buttonDisabledBg,
				},
			},
			...primaryCommon,
			borderWidth: borderWidthX2,
			elevation: null,
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			shadowRadius: null,
			backgroundColor: "transparent",
		},

		".dark": {
			".bordered": { ...darkCommon },
			backgroundColor: theme.brandDark,
		},
		".light": {
			".transparent": { ...lightCommon, backgroundColor: "transparent" },
			".bordered": { ...lightCommon },
			...darkCommon,
			backgroundColor: theme.brandLight,
		},

		".primary": {
			".bordered": { ...primaryCommon },
			backgroundColor: theme.buttonPrimaryBg,
		},

		".success": {
			".bordered": { ...successCommon },
			backgroundColor: theme.buttonSuccessBg,
		},

		".info": {
			".bordered": { ...infoCommon },
			backgroundColor: theme.buttonInfoBg,
		},

		".warning": {
			".bordered": { ...warningCommon },
			backgroundColor: theme.buttonWarningBg,
		},

		".danger": {
			".bordered": { ...dangerCommon },
			backgroundColor: theme.buttonDangerBg,
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
			borderRadius: theme.borderRadiusLarge,
		},

		".transparent": {
			backgroundColor: "transparent",
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
				backgroundColor: "transparent",
				borderColor: theme.buttonDisabledBg,
				borderWidth: borderWidthX2,
				"elements/Text": { color: theme.buttonDisabledBg },
				"elements/Icon": { color: theme.buttonDisabledBg },
				"elements/IconNB": { color: theme.buttonDisabledBg },
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
			flexDirection: "column",
			height: null,
		},

		"elements/Text": {
			fontFamily: theme.buttonFontFamily,
			marginLeft: 0,
			marginRight: 0,
			color: theme.inverseTextColor,
			fontSize: theme.buttonTextSize,
			paddingHorizontal: 16,
			backgroundColor: "transparent",
		},

		"elements/Icon": {
			color: theme.inverseTextColor,
			fontSize: 24,
			marginHorizontal: 16,
			paddingTop: itsIOS && 2,
		},
		"elements/IconNB": {
			color: theme.inverseTextColor,
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
		paddingVertical: theme.buttonPadding,
		backgroundColor: theme.buttonPrimaryBg,
		borderRadius: theme.borderRadiusBase,
		borderColor: theme.buttonPrimaryBg,
		borderWidth: null,
		height: 45,
		flexDirection: "row",
		elevation: 2,
		shadowColor: platformStyle === MATERIAL && theme.brandDark,
		shadowOffset: platformStyle === MATERIAL && { width: 0, height: 2 },
		shadowOpacity: platformStyle === MATERIAL && 0.2,
		shadowRadius: platformStyle === MATERIAL && 1.2,
		alignItems: CENTER,
		justifyContent: "space-between",
	}
	return buttonTheme
}
