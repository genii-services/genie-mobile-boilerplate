/** 공통 라이브러리 */
const { StyleSheet } = require("react-native")

const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const transparentBtnCommon = {
		"NativeBase.Text": {
			fontSize: theme.DefaultFontSize - 3,
			color: theme.sTabBarActiveTextColor,
		},
		"NativeBase.Icon": {
			fontSize: theme.iconFontSize - 10,
			color: theme.sTabBarActiveTextColor,
			marginHorizontal: null,
		},
		"NativeBase.IconNB": {
			fontSize: theme.iconFontSize - 10,
			color: theme.sTabBarActiveTextColor,
		},
		paddingVertical: null,
		paddingHorizontal: null,
	}

	const cardItemTheme = {
		"NativeBase.Left": {
			"NativeBase.Body": {
				"NativeBase.Text": {
					".note": {
						color: theme.listNoteColor,
						fontWeight: "400",
						marginRight: 20,
					},
				},
				flex: 1,
				marginLeft: 10,
				alignItems: null,
			},
			"NativeBase.Icon": {
				fontSize: theme.iconFontSize,
			},
			"NativeBase.IconNB": {
				fontSize: theme.iconFontSize,
			},
			"NativeBase.Text": {
				marginLeft: 10,
				alignSelf: CENTER,
			},
			"NativeBase.Button": {
				".transparent": {
					...transparentBtnCommon,
					paddingRight: theme.cardItemPadding + 5,
				},
			},
			flex: 1,
			flexDirection: "row",
			alignItems: CENTER,
		},
		".content": {
			"NativeBase.Text": {
				color: itsIOS ? "#555" : "#222",
				fontSize: theme.DefaultFontSize - 2,
			},
		},
		".cardBody": {
			padding: -5,
			"NativeBase.Text": {
				marginTop: 5,
			},
		},
		"NativeBase.Body": {
			"NativeBase.Text": {
				".note": {
					color: theme.listNoteColor,
					fontWeight: "200",
					marginRight: 20,
				},
			},
			"NativeBase.Button": {
				".transparent": {
					...transparentBtnCommon,
					paddingRight: theme.cardItemPadding + 5,
					alignSelf: "stretch",
				},
			},
			flex: 1,
			alignSelf: "stretch",
			alignItems: "flex-start",
		},
		"NativeBase.Right": {
			"NativeBase.Badge": {
				alignSelf: null,
			},
			"NativeBase.Button": {
				".transparent": {
					...transparentBtnCommon,
				},
				alignSelf: null,
			},
			"NativeBase.Icon": {
				alignSelf: null,
				fontSize: theme.iconFontSize - 8,
				color: theme.cardBorderColor,
			},
			"NativeBase.IconNB": {
				alignSelf: null,
				fontSize: theme.iconFontSize - 8,
				color: theme.cardBorderColor,
			},
			"NativeBase.Text": {
				fontSize: theme.DefaultFontSize - 1,
				alignSelf: null,
			},
			"NativeBase.Thumbnail": {
				alignSelf: null,
			},
			"NativeBase.Image": {
				alignSelf: null,
			},
			"NativeBase.Radio": {
				alignSelf: null,
			},
			"NativeBase.Checkbox": {
				alignSelf: null,
			},
			"NativeBase.Switch": {
				alignSelf: null,
			},
			flex: 0.8,
		},
		".header": {
			"NativeBase.Text": {
				fontSize: 16,
				fontWeight: itsIOS ? "600" : "500",
			},
			".bordered": {
				"NativeBase.Text": {
					color: theme.brandPrimary,
					fontWeight: itsIOS ? "600" : "500",
				},
				borderBottomWidth: theme.borderWidth,
			},
			borderBottomWidth: null,
			paddingVertical: theme.cardItemPadding + 5,
		},
		".footer": {
			"NativeBase.Text": {
				fontSize: 16,
				fontWeight: itsIOS ? "600" : "500",
			},
			".bordered": {
				"NativeBase.Text": {
					color: theme.brandPrimary,
					fontWeight: itsIOS ? "600" : "500",
				},
				borderTopWidth: theme.borderWidth,
			},
			borderBottomWidth: null,
		},
		"NativeBase.Text": {
			".note": {
				color: theme.listNoteColor,
				fontWeight: "200",
			},
		},
		"NativeBase.Icon": {
			width: theme.iconFontSize + 5,
			fontSize: theme.iconFontSize - 2,
		},
		"NativeBase.IconNB": {
			width: theme.iconFontSize + 5,
			fontSize: theme.iconFontSize - 2,
		},
		".bordered": {
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderColor: theme.cardBorderColor,
		},
		".first": {
			borderTopLeftRadius: theme.cardBorderRadius,
			borderTopRightRadius: theme.cardBorderRadius,
		},
		".last": {
			borderBottomLeftRadius: theme.cardBorderRadius,
			borderBottomRightRadius: theme.cardBorderRadius,
		},
		flexDirection: "row",
		alignItems: CENTER,
		borderRadius: theme.cardBorderRadius,
		padding: theme.cardItemPadding + 5,
		paddingVertical: theme.cardItemPadding,
		backgroundColor: theme.cardDefaultBg,
	}

	return cardItemTheme
}
