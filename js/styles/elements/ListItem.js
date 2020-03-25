/** Element Style */
const { PixelRatio } = require("react-native")

const { CENTER, FLEX_START, FLEX_END, ROW, TRANSPARENT, WHITE } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const pickerTheme = require("./Picker")

module.exports = style => {
	const selectedStyle = {
		"elements/Text": { color: style.listItemSelected },
		"elements/Icon": { color: style.listItemSelected },
	}

	return {
		"elements/InputGroup": {
			"elements/Icon": { paddingRight: 5 },
			"elements/IconNB": { paddingRight: 5 },
			"elements/Input": { paddingHorizontal: 5 },
			flex: 1,
			borderWidth: null,
			margin: -10,
			borderBottomColor: TRANSPARENT,
		},
		".searchBar": {
			"elements/Item": {
				"elements/Icon": {
					backgroundColor: TRANSPARENT,
					color: style.dropdownLinkColor,
					fontSize: itsIOS ? style.iconFontSize - 10 : style.iconFontSize - 5,
					alignItems: CENTER,
					marginTop: 2,
					paddingRight: 8,
				},
				"elements/IconNB": {
					backgroundColor: TRANSPARENT,
					color: null,
					alignSelf: CENTER,
				},
				"elements/Input": { alignSelf: CENTER },
				alignSelf: CENTER,
				alignItems: CENTER,
				justifyContent: FLEX_START,
				flex: 1,
				height: itsIOS ? 30 : 40,
				borderColor: TRANSPARENT,
				backgroundColor: WHITE,
				borderRadius: 5,
			},
			"elements/Button": {
				".transparent": {
					"elements/Text": { fontWeight: "500" },
					paddingHorizontal: null,
					paddingLeft: itsIOS ? 10 : null,
				},
				paddingHorizontal: itsIOS ? undefined : null,
				width: itsIOS ? undefined : 0,
				height: itsIOS ? undefined : 0,
			},
			backgroundColor: style.toolbarInputColor,
			padding: 10,
			marginLeft: null,
		},
		"elements/CheckBox": { marginLeft: -10, marginRight: 10 },
		".first": {
			".itemHeader": { paddingTop: style.listItemPadding + 3 },
		},
		".itemHeader": {
			".first": { paddingTop: style.listItemPadding + 3 },
			borderBottomWidth: itsIOS ? style.borderWidth : null,
			marginLeft: null,
			padding: style.listItemPadding,
			paddingLeft: style.listItemPadding + 5,
			paddingTop: itsIOS && style.listItemPadding + 25,
			paddingBottom: itsAndroid && style.listItemPadding + 20,
			flexDirection: ROW,
			borderColor: style.listBorderColor,
			"elements/Text": {
				fontSize: 14,
				color: itsIOS ? undefined : style.listNoteColor,
			},
		},
		".itemDivider": {
			borderBottomWidth: null,
			marginLeft: null,
			padding: style.listItemPadding,
			paddingLeft: style.listItemPadding + 5,
			backgroundColor: style.listDividerBg,
			flexDirection: ROW,
			borderColor: style.listBorderColor,
		},
		".selected": {
			"elements/Left": { ...selectedStyle },
			"elements/Body": { ...selectedStyle },
			"elements/Right": { ...selectedStyle },
			...selectedStyle,
		},
		"elements/Left": {
			"elements/Body": {
				"elements/Text": {
					".note": {
						color: style.listNoteColor,
						fontWeight: "200",
					},
					fontWeight: "600",
				},
				marginLeft: 10,
				alignItems: null,
				alignSelf: null,
			},
			"elements/Icon": { width: style.iconFontSize - 10, fontSize: style.iconFontSize - 10 },
			"elements/IconNB": { width: style.iconFontSize - 10, fontSize: style.iconFontSize - 10 },
			"elements/Text": { alignSelf: CENTER },
			flexDirection: ROW,
		},
		"elements/Body": {
			"elements/Text": {
				marginHorizontal: style.listItemPadding,
				".note": {
					color: style.listNoteColor,
					fontWeight: "200",
				},
			},
			alignSelf: null,
			alignItems: null,
		},
		"elements/Right": {
			"elements/Badge": { alignSelf: null },
			"elements/PickerNB": {
				"elements/Button": {
					marginRight: -15,
					"elements/Text": { color: style.topTabBarActiveTextColor },
				},
			},
			"elements/Button": {
				alignSelf: null,
				".transparent": {
					"elements/Text": { color: style.topTabBarActiveTextColor },
				},
			},
			"elements/Icon": {
				alignSelf: null,
				fontSize: style.iconFontSize - 8,
				color: "#c9c8cd",
			},
			"elements/IconNB": {
				alignSelf: null,
				fontSize: style.iconFontSize - 8,
				color: "#c9c8cd",
			},
			"elements/Text": {
				".note": {
					color: style.listNoteColor,
					fontWeight: "200",
				},
				alignSelf: null,
			},
			"elements/Thumbnail": { alignSelf: null },
			"elements/Image": { alignSelf: null },
			"elements/Radio": { alignSelf: null },
			"elements/Checkbox": { alignSelf: null },
			"elements/Switch": { alignSelf: null },
			padding: null,
			flex: 0.28,
		},
		"elements/Text": {
			".note": {
				color: style.listNoteColor,
				fontWeight: "200",
			},
			alignSelf: CENTER,
		},
		".last": {
			marginLeft: -(style.listItemPadding + 5),
			paddingLeft: (style.listItemPadding + 5) * 2,
			top: 1,
		},
		".avatar": {
			"elements/Left": {
				flex: 0,
				alignSelf: FLEX_START,
				paddingTop: 14,
			},
			"elements/Body": {
				"elements/Text": {
					marginLeft: null,
				},
				flex: 1,
				paddingVertical: style.listItemPadding,
				borderBottomWidth: style.borderWidth,
				borderColor: style.listBorderColor,
				marginLeft: style.listItemPadding + 5,
			},
			"elements/Right": {
				"elements/Text": {
					".note": {
						fontSize: style.noteFontSize - 2,
					},
				},
				flex: 0,
				paddingRight: style.listItemPadding + 5,
				alignSelf: "stretch",
				paddingVertical: style.listItemPadding,
				borderBottomWidth: style.borderWidth,
				borderColor: style.listBorderColor,
			},
			".noBorder": {
				"elements/Body": { borderBottomWidth: null },
				"elements/Right": { borderBottomWidth: null },
			},
			borderBottomWidth: null,
			paddingVertical: null,
			paddingRight: null,
		},
		".thumbnail": {
			"elements/Left": { flex: 0 },
			"elements/Body": {
				"elements/Text": { marginLeft: null },
				flex: 1,
				paddingVertical: style.listItemPadding + 8,
				borderBottomWidth: style.borderWidth,
				borderColor: style.listBorderColor,
				marginLeft: style.listItemPadding + 5,
			},
			"elements/Right": {
				"elements/Button": {
					".transparent": {
						"elements/Text": {
							fontSize: style.listNoteSize,
							color: style.sTabBarActiveTextColor,
						},
					},
					height: null,
				},
				flex: 0,
				justifyContent: CENTER,
				alignSelf: "stretch",
				paddingRight: style.listItemPadding + 5,
				paddingVertical: style.listItemPadding + 5,
				borderBottomWidth: style.borderWidth,
				borderColor: style.listBorderColor,
			},
			".noBorder": {
				"elements/Body": {
					borderBottomWidth: null,
				},
				"elements/Right": {
					borderBottomWidth: null,
				},
			},
			borderBottomWidth: null,
			paddingVertical: null,
			paddingRight: null,
		},
		".icon": {
			".last": {
				"elements/Body": {
					borderBottomWidth: null,
				},
				"elements/Right": {
					borderBottomWidth: null,
				},
				borderBottomWidth: style.borderWidth,
				borderColor: style.listBorderColor,
			},
			"elements/Left": {
				"elements/Button": {
					"elements/IconNB": {
						marginHorizontal: null,
						fontSize: style.iconFontSize - 5,
					},
					"elements/Icon": {
						marginHorizontal: null,
						fontSize: style.iconFontSize - 8,
					},
					alignSelf: CENTER,
					height: 29,
					width: 29,
					borderRadius: 6,
					paddingVertical: null,
					paddingHorizontal: null,
					alignItems: CENTER,
					justifyContent: CENTER,
				},
				"elements/Icon": {
					width: style.iconFontSize - 5,
					fontSize: style.iconFontSize - 2,
				},
				"elements/IconNB": {
					width: style.iconFontSize - 5,
					fontSize: style.iconFontSize - 2,
				},
				paddingRight: style.listItemPadding + 5,
				flex: 0,
				height: 44,
				justifyContent: CENTER,
				alignItems: CENTER,
			},
			"elements/Body": {
				"elements/Text": {
					marginLeft: null,
					fontSize: 17,
				},
				flex: 1,
				height: 44,
				justifyContent: CENTER,
				borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
				borderColor: style.listBorderColor,
			},
			"elements/Right": {
				"elements/Text": {
					textAlign: CENTER,
					color: "#8F8E95",
					fontSize: 17,
				},
				"elements/IconNB": {
					color: "#C8C7CC",
					fontSize: style.iconFontSize - 10,
					alignSelf: CENTER,
					paddingLeft: 10,
					paddingTop: 3,
				},
				"elements/Icon": {
					color: "#C8C7CC",
					fontSize: style.iconFontSize - 10,
					alignSelf: CENTER,
					paddingLeft: 10,
					paddingTop: 3,
				},
				"elements/Switch": {
					marginRight: itsIOS ? undefined : -5,
					alignSelf: null,
				},
				"elements/PickerNB": { ...pickerTheme() },
				flexDirection: ROW,
				alignItems: CENTER,
				flex: 0,
				alignSelf: "stretch",
				height: 44,
				justifyContent: FLEX_END,
				borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
				borderColor: style.listBorderColor,
				paddingRight: style.listItemPadding + 5,
			},
			".noBorder": {
				"elements/Body": { borderBottomWidth: null },
				"elements/Right": { borderBottomWidth: null },
			},
			borderBottomWidth: null,
			paddingVertical: null,
			paddingRight: null,
			height: 44,
			justifyContent: CENTER,
		},
		".noBorder": {
			borderBottomWidth: null,
		},
		".noIndent": {
			marginLeft: null,
			padding: style.listItemPadding,
			paddingLeft: style.listItemPadding + 6,
		},
		alignItems: CENTER,
		flexDirection: ROW,
		paddingRight: style.listItemPadding + 6,
		paddingVertical: style.listItemPadding + 3,
		marginLeft: style.listItemPadding + 6,
		borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
		backgroundColor: style.listBg,
		borderColor: style.listBorderColor,
	}
}
