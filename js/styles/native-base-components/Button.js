/** 공통 라이브러리 */
const { CENTER, MATERIAL } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const { platform, platformStyle } = theme
	const darkCommon = {
		"NativeBase.Text": {
			color: theme.brandDark,
		},
		"NativeBase.Icon": {
			color: theme.brandDark,
		},
		"NativeBase.IconNB": {
			color: theme.brandDark,
		},
	}
	const lightCommon = {
		"NativeBase.Text": {
			color: theme.brandLight,
		},
		"NativeBase.Icon": {
			color: theme.brandLight,
		},
		"NativeBase.IconNB": {
			color: theme.brandLight,
		},
	}
	const primaryCommon = {
		"NativeBase.Text": {
			color: theme.buttonPrimaryBg,
		},
		"NativeBase.Icon": {
			color: theme.buttonPrimaryBg,
		},
		"NativeBase.IconNB": {
			color: theme.buttonPrimaryBg,
		},
	}
	const successCommon = {
		"NativeBase.Text": {
			color: theme.buttonSuccessBg,
		},
		"NativeBase.Icon": {
			color: theme.buttonSuccessBg,
		},
		"NativeBase.IconNB": {
			color: theme.buttonSuccessBg,
		},
	}
	const infoCommon = {
		"NativeBase.Text": {
			color: theme.buttonInfoBg,
		},
		"NativeBase.Icon": {
			color: theme.buttonInfoBg,
		},
		"NativeBase.IconNB": {
			color: theme.buttonInfoBg,
		},
	}
	const warningCommon = {
		"NativeBase.Text": {
			color: theme.buttonWarningBg,
		},
		"NativeBase.Icon": {
			color: theme.buttonWarningBg,
		},
		"NativeBase.IconNB": {
			color: theme.buttonWarningBg,
		},
	}
	const dangerCommon = {
		"NativeBase.Text": {
			color: theme.buttonDangerBg,
		},
		"NativeBase.Icon": {
			color: theme.buttonDangerBg,
		},
		"NativeBase.IconNB": {
			color: theme.buttonDangerBg,
		},
	}
	const buttonTheme = {
		".disabled": {
			".transparent": {
				backgroundColor: "transparent",
				"NativeBase.Text": {
					color: theme.buttonDisabledBg,
				},
				"NativeBase.Icon": {
					color: theme.buttonDisabledBg,
				},
				"NativeBase.IconNB": {
					color: theme.buttonDisabledBg,
				},
			},
			"NativeBase.Icon": {
				color: theme.brandLight,
			},
			"NativeBase.IconNB": {
				color: theme.brandLight,
			},
			backgroundColor: theme.buttonDisabledBg,
		},
		".bordered": {
			".dark": {
				...darkCommon,
				backgroundColor: "transparent",
				borderColor: theme.brandDark,
				borderWidth: theme.borderWidth * 2,
			},
			".light": {
				...lightCommon,
				backgroundColor: "transparent",
				borderColor: theme.brandLight,
				borderWidth: theme.borderWidth * 2,
			},
			".primary": {
				...primaryCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonPrimaryBg,
				borderWidth: theme.borderWidth * 2,
			},
			".success": {
				...successCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonSuccessBg,
				borderWidth: theme.borderWidth * 2,
			},
			".info": {
				...infoCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonInfoBg,
				borderWidth: theme.borderWidth * 2,
			},
			".warning": {
				...warningCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonWarningBg,
				borderWidth: theme.borderWidth * 2,
			},
			".danger": {
				...dangerCommon,
				backgroundColor: "transparent",
				borderColor: theme.buttonDangerBg,
				borderWidth: theme.borderWidth * 2,
			},
			".disabled": {
				backgroundColor: "transparent",
				borderColor: theme.buttonDisabledBg,
				borderWidth: theme.borderWidth * 2,
				"NativeBase.Text": {
					color: theme.buttonDisabledBg,
				},
			},
			...primaryCommon,
			borderWidth: theme.borderWidth * 2,
			elevation: null,
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			shadowRadius: null,
			backgroundColor: "transparent",
		},

		".dark": {
			".bordered": {
				...darkCommon,
			},
			backgroundColor: theme.brandDark,
		},
		".light": {
			".transparent": {
				...lightCommon,
				backgroundColor: "transparent",
			},
			".bordered": {
				...lightCommon,
			},
			...darkCommon,
			backgroundColor: theme.brandLight,
		},

		".primary": {
			".bordered": {
				...primaryCommon,
			},
			backgroundColor: theme.buttonPrimaryBg,
		},

		".success": {
			".bordered": {
				...successCommon,
			},
			backgroundColor: theme.buttonSuccessBg,
		},

		".info": {
			".bordered": {
				...infoCommon,
			},
			backgroundColor: theme.buttonInfoBg,
		},

		".warning": {
			".bordered": {
				...warningCommon,
			},
			backgroundColor: theme.buttonWarningBg,
		},

		".danger": {
			".bordered": {
				...dangerCommon,
			},
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
			".dark": {
				...darkCommon,
			},
			".danger": {
				...dangerCommon,
			},
			".warning": {
				...warningCommon,
			},
			".info": {
				...infoCommon,
			},
			".primary": {
				...primaryCommon,
			},
			".success": {
				...successCommon,
			},
			".light": {
				...lightCommon,
			},
			".disabled": {
				backgroundColor: "transparent",
				borderColor: theme.buttonDisabledBg,
				borderWidth: theme.borderWidth * 2,
				"NativeBase.Text": {
					color: theme.buttonDisabledBg,
				},
				"NativeBase.Icon": {
					color: theme.buttonDisabledBg,
				},
				"NativeBase.IconNB": {
					color: theme.buttonDisabledBg,
				},
			},
		},

		".small": {
			height: 30,
			"NativeBase.Text": {
				fontSize: 14,
			},
			"NativeBase.Icon": {
				fontSize: 20,
				paddingTop: 0,
			},
			"NativeBase.IconNB": {
				fontSize: 20,
				paddingTop: 0,
			},
		},

		".large": {
			height: 60,
			"NativeBase.Text": {
				fontSize: 22,
			},
		},

		".capitalize": {},

		".vertical": {
			flexDirection: "column",
			height: null,
		},

		"NativeBase.Text": {
			fontFamily: theme.buttonFontFamily,
			marginLeft: 0,
			marginRight: 0,
			color: theme.inverseTextColor,
			fontSize: theme.buttonTextSize,
			paddingHorizontal: 16,
			backgroundColor: "transparent",
		},

		"NativeBase.Icon": {
			color: theme.inverseTextColor,
			fontSize: 24,
			marginHorizontal: 16,
			paddingTop: itsIOS ? 2 : undefined,
		},
		"NativeBase.IconNB": {
			color: theme.inverseTextColor,
			fontSize: 24,
			marginHorizontal: 16,
			paddingTop: itsIOS ? 2 : undefined,
		},

		".iconLeft": {
			"NativeBase.Text": {
				marginLeft: 0,
			},
			"NativeBase.IconNB": {
				marginRight: 0,
				marginLeft: 16,
			},
			"NativeBase.Icon": {
				marginRight: 0,
				marginLeft: 16,
			},
		},
		".iconRight": {
			"NativeBase.Text": {
				marginRight: 0,
			},
			"NativeBase.IconNB": {
				marginLeft: 0,
				marginRight: 16,
			},
			"NativeBase.Icon": {
				marginLeft: 0,
				marginRight: 16,
			},
		},
		".picker": {
			"NativeBase.Text": {
				".note": {
					fontSize: 16,
					lineHeight: null,
				},
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
		shadowColor: platformStyle === MATERIAL ? theme.brandDark : undefined,
		shadowOffset: platformStyle === MATERIAL ? { width: 0, height: 2 } : undefined,
		shadowOpacity: platformStyle === MATERIAL ? 0.2 : undefined,
		shadowRadius: platformStyle === MATERIAL ? 1.2 : undefined,
		alignItems: CENTER,
		justifyContent: "space-between",
	}
	return buttonTheme
}
