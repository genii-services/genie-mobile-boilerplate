/** 공통 라이브러리 */
const { PixelRatio } = require("react-native")

const { CENTER } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const pickerTheme = require("./Picker")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const selectedStyle = {
		"NativeBase.Text": {
			color: theme.listItemSelected,
		},
		"NativeBase.Icon": {
			color: theme.listItemSelected,
		},
	}

	const listItemTheme = {
		"NativeBase.InputGroup": {
			"NativeBase.Icon": {
				paddingRight: 5,
			},
			"NativeBase.IconNB": {
				paddingRight: 5,
			},
			"NativeBase.Input": {
				paddingHorizontal: 5,
			},
			flex: 1,
			borderWidth: null,
			margin: -10,
			borderBottomColor: "transparent",
		},
		".searchBar": {
			"NativeBase.Item": {
				"NativeBase.Icon": {
					backgroundColor: "transparent",
					color: theme.dropdownLinkColor,
					fontSize: itsIOS ? theme.iconFontSize - 10 : theme.iconFontSize - 5,
					alignItems: CENTER,
					marginTop: 2,
					paddingRight: 8,
				},
				"NativeBase.IconNB": {
					backgroundColor: "transparent",
					color: null,
					alignSelf: CENTER,
				},
				"NativeBase.Input": {
					alignSelf: CENTER,
				},
				alignSelf: CENTER,
				alignItems: CENTER,
				justifyContent: "flex-start",
				flex: 1,
				height: itsIOS ? 30 : 40,
				borderColor: "transparent",
				backgroundColor: "#fff",
				borderRadius: 5,
			},
			"NativeBase.Button": {
				".transparent": {
					"NativeBase.Text": {
						fontWeight: "500",
					},
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
		"NativeBase.CheckBox": {
			marginLeft: -10,
			marginRight: 10,
		},
		".first": {
			".itemHeader": {
				paddingTop: theme.listItemPadding + 3,
			},
		},
		".itemHeader": {
			".first": {
				paddingTop: theme.listItemPadding + 3,
			},
			borderBottomWidth: itsIOS ? theme.borderWidth : null,
			marginLeft: null,
			padding: theme.listItemPadding,
			paddingLeft: theme.listItemPadding + 5,
			paddingTop: itsIOS ? theme.listItemPadding + 25 : undefined,
			paddingBottom: itsAndroid ? theme.listItemPadding + 20 : undefined,
			flexDirection: "row",
			borderColor: theme.listBorderColor,
			"NativeBase.Text": {
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
			"NativeBase.Left": {
				...selectedStyle,
			},
			"NativeBase.Body": {
				...selectedStyle,
			},
			"NativeBase.Right": {
				...selectedStyle,
			},
			...selectedStyle,
		},
		"NativeBase.Left": {
			"NativeBase.Body": {
				"NativeBase.Text": {
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
			"NativeBase.Icon": {
				width: theme.iconFontSize - 10,
				fontSize: theme.iconFontSize - 10,
			},
			"NativeBase.IconNB": {
				width: theme.iconFontSize - 10,
				fontSize: theme.iconFontSize - 10,
			},
			"NativeBase.Text": {
				alignSelf: CENTER,
			},
			flexDirection: "row",
		},
		"NativeBase.Body": {
			"NativeBase.Text": {
				marginHorizontal: theme.listItemPadding,
				".note": {
					color: theme.listNoteColor,
					fontWeight: "200",
				},
			},
			alignSelf: null,
			alignItems: null,
		},
		"NativeBase.Right": {
			"NativeBase.Badge": {
				alignSelf: null,
			},
			"NativeBase.PickerNB": {
				"NativeBase.Button": {
					marginRight: -15,
					"NativeBase.Text": {
						color: theme.topTabBarActiveTextColor,
					},
				},
			},
			"NativeBase.Button": {
				alignSelf: null,
				".transparent": {
					"NativeBase.Text": {
						color: theme.topTabBarActiveTextColor,
					},
				},
			},
			"NativeBase.Icon": {
				alignSelf: null,
				fontSize: theme.iconFontSize - 8,
				color: "#c9c8cd",
			},
			"NativeBase.IconNB": {
				alignSelf: null,
				fontSize: theme.iconFontSize - 8,
				color: "#c9c8cd",
			},
			"NativeBase.Text": {
				".note": {
					color: theme.listNoteColor,
					fontWeight: "200",
				},
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
			padding: null,
			flex: 0.28,
		},
		"NativeBase.Text": {
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
			"NativeBase.Left": {
				flex: 0,
				alignSelf: "flex-start",
				paddingTop: 14,
			},
			"NativeBase.Body": {
				"NativeBase.Text": {
					marginLeft: null,
				},
				flex: 1,
				paddingVertical: theme.listItemPadding,
				borderBottomWidth: theme.borderWidth,
				borderColor: theme.listBorderColor,
				marginLeft: theme.listItemPadding + 5,
			},
			"NativeBase.Right": {
				"NativeBase.Text": {
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
				"NativeBase.Body": {
					borderBottomWidth: null,
				},
				"NativeBase.Right": {
					borderBottomWidth: null,
				},
			},
			borderBottomWidth: null,
			paddingVertical: null,
			paddingRight: null,
		},
		".thumbnail": {
			"NativeBase.Left": {
				flex: 0,
			},
			"NativeBase.Body": {
				"NativeBase.Text": {
					marginLeft: null,
				},
				flex: 1,
				paddingVertical: theme.listItemPadding + 8,
				borderBottomWidth: theme.borderWidth,
				borderColor: theme.listBorderColor,
				marginLeft: theme.listItemPadding + 5,
			},
			"NativeBase.Right": {
				"NativeBase.Button": {
					".transparent": {
						"NativeBase.Text": {
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
				"NativeBase.Body": {
					borderBottomWidth: null,
				},
				"NativeBase.Right": {
					borderBottomWidth: null,
				},
			},
			borderBottomWidth: null,
			paddingVertical: null,
			paddingRight: null,
		},
		".icon": {
			".last": {
				"NativeBase.Body": {
					borderBottomWidth: null,
				},
				"NativeBase.Right": {
					borderBottomWidth: null,
				},
				borderBottomWidth: theme.borderWidth,
				borderColor: theme.listBorderColor,
			},
			"NativeBase.Left": {
				"NativeBase.Button": {
					"NativeBase.IconNB": {
						marginHorizontal: null,
						fontSize: theme.iconFontSize - 5,
					},
					"NativeBase.Icon": {
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
				"NativeBase.Icon": {
					width: theme.iconFontSize - 5,
					fontSize: theme.iconFontSize - 2,
				},
				"NativeBase.IconNB": {
					width: theme.iconFontSize - 5,
					fontSize: theme.iconFontSize - 2,
				},
				paddingRight: theme.listItemPadding + 5,
				flex: 0,
				height: 44,
				justifyContent: CENTER,
				alignItems: CENTER,
			},
			"NativeBase.Body": {
				"NativeBase.Text": {
					marginLeft: null,
					fontSize: 17,
				},
				flex: 1,
				height: 44,
				justifyContent: CENTER,
				borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
				borderColor: theme.listBorderColor,
			},
			"NativeBase.Right": {
				"NativeBase.Text": {
					textAlign: CENTER,
					color: "#8F8E95",
					fontSize: 17,
				},
				"NativeBase.IconNB": {
					color: "#C8C7CC",
					fontSize: theme.iconFontSize - 10,
					alignSelf: CENTER,
					paddingLeft: 10,
					paddingTop: 3,
				},
				"NativeBase.Icon": {
					color: "#C8C7CC",
					fontSize: theme.iconFontSize - 10,
					alignSelf: CENTER,
					paddingLeft: 10,
					paddingTop: 3,
				},
				"NativeBase.Switch": {
					marginRight: itsIOS ? undefined : -5,
					alignSelf: null,
				},
				"NativeBase.PickerNB": {
					...pickerTheme(),
				},
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
				"NativeBase.Body": {
					borderBottomWidth: null,
				},
				"NativeBase.Right": {
					borderBottomWidth: null,
				},
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
