/** Element Style */
const { StyleSheet } = require("react-native")

const { CENTER, FLEX_START, ROW } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
	const transparentBtnCommon = {
		"elements/Text": {
			fontSize: style.DefaultFontSize - 3,
			color: style.sTabBarActiveTextColor,
		},
		"elements/Icon": {
			fontSize: style.iconFontSize - 10,
			color: style.sTabBarActiveTextColor,
			marginHorizontal: null,
		},
		"elements/IconNB": {
			fontSize: style.iconFontSize - 10,
			color: style.sTabBarActiveTextColor,
		},
		paddingVertical: null,
		paddingHorizontal: null,
	}

	return {
		"elements/Left": {
			"elements/Body": {
				"elements/Text": {
					".note": {
						color: style.listNoteColor,
						fontWeight: "400",
						marginRight: 20,
					},
				},
				flex: 1,
				marginLeft: 10,
				alignItems: null,
			},
			"elements/Icon": {
				fontSize: style.iconFontSize,
			},
			"elements/IconNB": {
				fontSize: style.iconFontSize,
			},
			"elements/Text": {
				marginLeft: 10,
				alignSelf: CENTER,
			},
			"elements/Button": {
				".transparent": {
					...transparentBtnCommon,
					paddingRight: style.cardItemPadding + 5,
				},
			},
			flex: 1,
			flexDirection: ROW,
			alignItems: CENTER,
		},
		".content": {
			"elements/Text": {
				color: itsIOS ? "#555" : "#222",
				fontSize: style.DefaultFontSize - 2,
			},
		},
		".cardBody": { padding: -5, "elements/Text": { marginTop: 5 } },
		"elements/Body": {
			"elements/Text": {
				".note": {
					color: style.listNoteColor,
					fontWeight: "200",
					marginRight: 20,
				},
			},
			"elements/Button": {
				".transparent": {
					...transparentBtnCommon,
					paddingRight: style.cardItemPadding + 5,
					alignSelf: "stretch",
				},
			},
			flex: 1,
			alignSelf: "stretch",
			alignItems: FLEX_START,
		},
		"elements/Right": {
			"elements/Badge": {
				alignSelf: null,
			},
			"elements/Button": {
				".transparent": { ...transparentBtnCommon },
				alignSelf: null,
			},
			"elements/Icon": { alignSelf: null, fontSize: style.iconFontSize - 8, color: style.cardBorderColor },
			"elements/IconNB": { alignSelf: null, fontSize: style.iconFontSize - 8, color: style.cardBorderColor },
			"elements/Text": { fontSize: style.fontSizeBase, alignSelf: null },
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
					color: style.brandPrimary,
					fontWeight: itsIOS ? "600" : "500",
				},
				borderBottomWidth: style.borderWidth,
			},
			borderBottomWidth: null,
			paddingVertical: style.cardItemPadding + 5,
		},
		".footer": {
			"elements/Text": {
				fontSize: 16,
				fontWeight: itsIOS ? "600" : "500",
			},
			".bordered": {
				"elements/Text": {
					color: style.brandPrimary,
					fontWeight: itsIOS ? "600" : "500",
				},
				borderTopWidth: style.borderWidth,
			},
			borderBottomWidth: null,
		},
		"elements/Text": {
			".note": {
				color: style.listNoteColor,
				fontWeight: "200",
			},
		},
		"elements/Icon": {
			width: style.iconFontSize + 5,
			fontSize: style.iconFontSize - 2,
		},
		"elements/IconNB": {
			width: style.iconFontSize + 5,
			fontSize: style.iconFontSize - 2,
		},
		".bordered": {
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderColor: style.cardBorderColor,
		},
		".first": {
			borderTopLeftRadius: style.cardBorderRadius,
			borderTopRightRadius: style.cardBorderRadius,
		},
		".last": {
			borderBottomLeftRadius: style.cardBorderRadius,
			borderBottomRightRadius: style.cardBorderRadius,
		},
		flexDirection: ROW,
		alignItems: CENTER,
		borderRadius: style.cardBorderRadius,
		padding: style.cardItemPadding + 5,
		paddingVertical: style.cardItemPadding,
		backgroundColor: style.cardDefaultBg,
	}
}
