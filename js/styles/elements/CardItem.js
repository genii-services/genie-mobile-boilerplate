/** 공통 라이브러리 */
const { StyleSheet } = require("react-native")

const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const transparentBtnCommon = {
		"elements/Text": {
			fontSize: theme.DefaultFontSize - 3,
			color: theme.sTabBarActiveTextColor,
		},
		"elements/Icon": {
			fontSize: theme.iconFontSize - 10,
			color: theme.sTabBarActiveTextColor,
			marginHorizontal: null,
		},
		"elements/IconNB": {
			fontSize: theme.iconFontSize - 10,
			color: theme.sTabBarActiveTextColor,
		},
		paddingVertical: null,
		paddingHorizontal: null,
	}

	const cardItemTheme = {
		"elements/Left": {
			"elements/Body": {
				"elements/Text": {
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
			"elements/Icon": {
				fontSize: theme.iconFontSize,
			},
			"elements/IconNB": {
				fontSize: theme.iconFontSize,
			},
			"elements/Text": {
				marginLeft: 10,
				alignSelf: CENTER,
			},
			"elements/Button": {
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
			"elements/Text": {
				color: itsIOS ? "#555" : "#222",
				fontSize: theme.DefaultFontSize - 2,
			},
		},
		".cardBody": { padding: -5, "elements/Text": { marginTop: 5 } },
		"elements/Body": {
			"elements/Text": {
				".note": {
					color: theme.listNoteColor,
					fontWeight: "200",
					marginRight: 20,
				},
			},
			"elements/Button": {
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
		"elements/Right": {
			"elements/Badge": {
				alignSelf: null,
			},
			"elements/Button": {
				".transparent": { ...transparentBtnCommon },
				alignSelf: null,
			},
			"elements/Icon": { alignSelf: null, fontSize: theme.iconFontSize - 8, color: theme.cardBorderColor },
			"elements/IconNB": { alignSelf: null, fontSize: theme.iconFontSize - 8, color: theme.cardBorderColor },
			"elements/Text": { fontSize: theme.DefaultFontSize - 1, alignSelf: null },
			"elements/Thumbnail": { alignSelf: null },
			"elements/Image": { alignSelf: null },
			"elements/Radio": { alignSelf: null },
			"elements/Checkbox": { alignSelf: null },
			"elements/Switch": { alignSelf: null },
			flex: 0.8,
		},
		".header": {
			"elements/Text": {
				fontSize: 16,
				fontWeight: itsIOS ? "600" : "500",
			},
			".bordered": {
				"elements/Text": {
					color: theme.brandPrimary,
					fontWeight: itsIOS ? "600" : "500",
				},
				borderBottomWidth: theme.borderWidth,
			},
			borderBottomWidth: null,
			paddingVertical: theme.cardItemPadding + 5,
		},
		".footer": {
			"elements/Text": {
				fontSize: 16,
				fontWeight: itsIOS ? "600" : "500",
			},
			".bordered": {
				"elements/Text": {
					color: theme.brandPrimary,
					fontWeight: itsIOS ? "600" : "500",
				},
				borderTopWidth: theme.borderWidth,
			},
			borderBottomWidth: null,
		},
		"elements/Text": {
			".note": {
				color: theme.listNoteColor,
				fontWeight: "200",
			},
		},
		"elements/Icon": {
			width: theme.iconFontSize + 5,
			fontSize: theme.iconFontSize - 2,
		},
		"elements/IconNB": {
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
