/** 공통 라이브러리 */
const { PixelRatio } = require("react-native")

const { CENTER } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const pickerTheme = require("./Picker")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const selectedStyle = {
		"elements/Text": { color: theme.listItemSelected },
		"elements/Icon": { color: theme.listItemSelected },
	}

	const listItemTheme = {
		"elements/InputGroup": {
			"elements/Icon": { paddingRight: 5 },
			"elements/IconNB": { paddingRight: 5 },
			"elements/Input": { paddingHorizontal: 5 },
			flex: 1,
			borderWidth: null,
			margin: -10,
			borderBottomColor: "transparent",
		},
		".searchBar": {
			"elements/Item": {
				"elements/Icon": {
					backgroundColor: "transparent",
					color: theme.dropdownLinkColor,
					fontSize: itsIOS ? theme.iconFontSize - 10 : theme.iconFontSize - 5,
					alignItems: CENTER,
					marginTop: 2,
					paddingRight: 8,
				},
				"elements/IconNB": {
					backgroundColor: "transparent",
					color: null,
					alignSelf: CENTER,
				},
				"elements/Input": { alignSelf: CENTER },
				alignSelf: CENTER,
				alignItems: CENTER,
				justifyContent: "flex-start",
				flex: 1,
				height: itsIOS ? 30 : 40,
				borderColor: "transparent",
				backgroundColor: "#fff",
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
			backgroundColor: theme.toolbarInputColor,
			padding: 10,
			marginLeft: null,
		},
		"elements/CheckBox": { marginLeft: -10, marginRight: 10 },
		".first": {
			".itemHeader": { paddingTop: theme.listItemPadding + 3 },
		},
		".itemHeader": {
			".first": { paddingTop: theme.listItemPadding + 3 },
			borderBottomWidth: itsIOS ? theme.borderWidth : null,
			marginLeft: null,
			padding: theme.listItemPadding,
			paddingLeft: theme.listItemPadding + 5,
			paddingTop: itsIOS ? theme.listItemPadding + 25 : undefined,
			paddingBottom: itsAndroid ? theme.listItemPadding + 20 : undefined,
			flexDirection: "row",
			borderColor: theme.listBorderColor,
			"elements/Text": {
				fontSize: 14,
				color: itsIOS ? undefined : theme.listNoteColor,
			},
		},
		".itemDivider": {
			borderBottomWidth: null,
			marginLeft: null,
			padding: theme.listItemPadding,
			paddingLeft: theme.listItemPadding + 5,
			backgroundColor: theme.listDividerBg,
			flexDirection: "row",
			borderColor: theme.listBorderColor,
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
						color: theme.listNoteColor,
						fontWeight: "200",
					},
					fontWeight: "600",
				},
				marginLeft: 10,
				alignItems: null,
				alignSelf: null,
			},
			"elements/Icon": { width: theme.iconFontSize - 10, fontSize: theme.iconFontSize - 10 },
			"elements/IconNB": { width: theme.iconFontSize - 10, fontSize: theme.iconFontSize - 10 },
			"elements/Text": { alignSelf: CENTER },
			flexDirection: "row",
		},
		"elements/Body": {
			"elements/Text": {
				marginHorizontal: theme.listItemPadding,
				".note": {
					color: theme.listNoteColor,
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
					"elements/Text": { color: theme.topTabBarActiveTextColor },
				},
			},
			"elements/Button": {
				alignSelf: null,
				".transparent": {
					"elements/Text": { color: theme.topTabBarActiveTextColor },
				},
			},
			"elements/Icon": {
				alignSelf: null,
				fontSize: theme.iconFontSize - 8,
				color: "#c9c8cd",
			},
			"elements/IconNB": {
				alignSelf: null,
				fontSize: theme.iconFontSize - 8,
				color: "#c9c8cd",
			},
			"elements/Text": {
				".note": {
					color: theme.listNoteColor,
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
				color: theme.listNoteColor,
				fontWeight: "200",
			},
			alignSelf: CENTER,
		},
		".last": {
			marginLeft: -(theme.listItemPadding + 5),
			paddingLeft: (theme.listItemPadding + 5) * 2,
			top: 1,
		},
		".avatar": {
			"elements/Left": {
				flex: 0,
				alignSelf: "flex-start",
				paddingTop: 14,
			},
			"elements/Body": {
				"elements/Text": {
					marginLeft: null,
				},
				flex: 1,
				paddingVertical: theme.listItemPadding,
				borderBottomWidth: theme.borderWidth,
				borderColor: theme.listBorderColor,
				marginLeft: theme.listItemPadding + 5,
			},
			"elements/Right": {
				"elements/Text": {
					".note": {
						fontSize: theme.noteFontSize - 2,
					},
				},
				flex: 0,
				paddingRight: theme.listItemPadding + 5,
				alignSelf: "stretch",
				paddingVertical: theme.listItemPadding,
				borderBottomWidth: theme.borderWidth,
				borderColor: theme.listBorderColor,
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
				paddingVertical: theme.listItemPadding + 8,
				borderBottomWidth: theme.borderWidth,
				borderColor: theme.listBorderColor,
				marginLeft: theme.listItemPadding + 5,
			},
			"elements/Right": {
				"elements/Button": {
					".transparent": {
						"elements/Text": {
							fontSize: theme.listNoteSize,
							color: theme.sTabBarActiveTextColor,
						},
					},
					height: null,
				},
				flex: 0,
				justifyContent: CENTER,
				alignSelf: "stretch",
				paddingRight: theme.listItemPadding + 5,
				paddingVertical: theme.listItemPadding + 5,
				borderBottomWidth: theme.borderWidth,
				borderColor: theme.listBorderColor,
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
				borderBottomWidth: theme.borderWidth,
				borderColor: theme.listBorderColor,
			},
			"elements/Left": {
				"elements/Button": {
					"elements/IconNB": {
						marginHorizontal: null,
						fontSize: theme.iconFontSize - 5,
					},
					"elements/Icon": {
						marginHorizontal: null,
						fontSize: theme.iconFontSize - 8,
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
					width: theme.iconFontSize - 5,
					fontSize: theme.iconFontSize - 2,
				},
				"elements/IconNB": {
					width: theme.iconFontSize - 5,
					fontSize: theme.iconFontSize - 2,
				},
				paddingRight: theme.listItemPadding + 5,
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
				borderColor: theme.listBorderColor,
			},
			"elements/Right": {
				"elements/Text": {
					textAlign: CENTER,
					color: "#8F8E95",
					fontSize: 17,
				},
				"elements/IconNB": {
					color: "#C8C7CC",
					fontSize: theme.iconFontSize - 10,
					alignSelf: CENTER,
					paddingLeft: 10,
					paddingTop: 3,
				},
				"elements/Icon": {
					color: "#C8C7CC",
					fontSize: theme.iconFontSize - 10,
					alignSelf: CENTER,
					paddingLeft: 10,
					paddingTop: 3,
				},
				"elements/Switch": {
					marginRight: itsIOS ? undefined : -5,
					alignSelf: null,
				},
				"elements/PickerNB": { ...pickerTheme() },
				flexDirection: "row",
				alignItems: CENTER,
				flex: 0,
				alignSelf: "stretch",
				height: 44,
				justifyContent: "flex-end",
				borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
				borderColor: theme.listBorderColor,
				paddingRight: theme.listItemPadding + 5,
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
			padding: theme.listItemPadding,
			paddingLeft: theme.listItemPadding + 6,
		},
		alignItems: CENTER,
		flexDirection: "row",
		paddingRight: theme.listItemPadding + 6,
		paddingVertical: theme.listItemPadding + 3,
		marginLeft: theme.listItemPadding + 6,
		borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
		backgroundColor: theme.listBg,
		borderColor: theme.listBorderColor,
	}

	return listItemTheme
}
