/** Element Style */
const { PixelRatio } = require("react-native")

const { CENTER, FLEX_START, FLEX_END, ROW, TRANSPARENT, WHITE } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const pickerTheme = require("./Picker")

module.exports = style => {
	const selectedStyle = {
		TextElement: { color: style.listItemSelected },
		IconElement: { color: style.listItemSelected },
	}

	return {
		InputGroupElement: {
			IconElement: { paddingRight: 5 },
			IconNBElement: { paddingRight: 5 },
			InputElement: { paddingHorizontal: 5 },
			flex: 1,
			borderWidth: null,
			margin: -10,
			borderBottomColor: TRANSPARENT,
		},
		".searchBar": {
			ItemElement: {
				IconElement: {
					backgroundColor: TRANSPARENT,
					color: style.dropdownLinkColor,
					fontSize: itsIOS ? style.iconSize - 10 : style.iconSize - 5,
					alignItems: CENTER,
					marginTop: 2,
					paddingRight: 8,
				},
				IconNBElement: {
					backgroundColor: TRANSPARENT,
					color: null,
					alignSelf: CENTER,
				},
				InputElement: { alignSelf: CENTER },
				alignSelf: CENTER,
				alignItems: CENTER,
				justifyContent: FLEX_START,
				flex: 1,
				height: itsIOS ? 30 : 40,
				borderColor: TRANSPARENT,
				backgroundColor: WHITE,
				borderRadius: 5,
			},
			ButtonElement: {
				".transparent": {
					TextElement: { fontWeight: "500" },
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
		CheckBoxElement: { marginLeft: -10, marginRight: 10 },
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
			TextElement: {
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
			LeftElement: { ...selectedStyle },
			BodyElement: { ...selectedStyle },
			RightElement: { ...selectedStyle },
			...selectedStyle,
		},
		LeftElement: {
			BodyElement: {
				TextElement: {
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
			IconElement: { width: style.iconSize - 10, fontSize: style.iconSize - 10 },
			IconNBElement: { width: style.iconSize - 10, fontSize: style.iconSize - 10 },
			TextElement: { alignSelf: CENTER },
			flexDirection: ROW,
		},
		BodyElement: {
			TextElement: {
				marginHorizontal: style.listItemPadding,
				".note": {
					color: style.listNoteColor,
					fontWeight: "200",
				},
			},
			alignSelf: null,
			alignItems: null,
		},
		RightElement: {
			BadgeElement: { alignSelf: null },
			PickerNBElement: {
				ButtonElement: {
					marginRight: -15,
					TextElement: { color: style.topTabBarActiveTextColor },
				},
			},
			ButtonElement: {
				alignSelf: null,
				".transparent": {
					TextElement: { color: style.topTabBarActiveTextColor },
				},
			},
			IconElement: {
				alignSelf: null,
				fontSize: style.iconSize - 8,
				color: "#c9c8cd",
			},
			IconNBElement: {
				alignSelf: null,
				fontSize: style.iconSize - 8,
				color: "#c9c8cd",
			},
			TextElement: {
				".note": {
					color: style.listNoteColor,
					fontWeight: "200",
				},
				alignSelf: null,
			},
			ThumbnailElement: { alignSelf: null },
			ImageElement: { alignSelf: null },
			RadioElement: { alignSelf: null },
			CheckboxElement: { alignSelf: null },
			SwitchElement: { alignSelf: null },
			padding: null,
			flex: 0.28,
		},
		TextElement: {
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
			LeftElement: {
				flex: 0,
				alignSelf: FLEX_START,
				paddingTop: 14,
			},
			BodyElement: {
				TextElement: {
					marginLeft: null,
				},
				flex: 1,
				paddingVertical: style.listItemPadding,
				borderBottomWidth: style.borderWidth,
				borderColor: style.listBorderColor,
				marginLeft: style.listItemPadding + 5,
			},
			RightElement: {
				TextElement: {
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
				BodyElement: { borderBottomWidth: null },
				RightElement: { borderBottomWidth: null },
			},
			borderBottomWidth: null,
			paddingVertical: null,
			paddingRight: null,
		},
		".thumbnail": {
			LeftElement: { flex: 0 },
			BodyElement: {
				TextElement: { marginLeft: null },
				flex: 1,
				paddingVertical: style.listItemPadding + 8,
				borderBottomWidth: style.borderWidth,
				borderColor: style.listBorderColor,
				marginLeft: style.listItemPadding + 5,
			},
			RightElement: {
				ButtonElement: {
					".transparent": {
						TextElement: {
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
				BodyElement: {
					borderBottomWidth: null,
				},
				RightElement: {
					borderBottomWidth: null,
				},
			},
			borderBottomWidth: null,
			paddingVertical: null,
			paddingRight: null,
		},
		".icon": {
			".last": {
				BodyElement: {
					borderBottomWidth: null,
				},
				RightElement: {
					borderBottomWidth: null,
				},
				borderBottomWidth: style.borderWidth,
				borderColor: style.listBorderColor,
			},
			LeftElement: {
				ButtonElement: {
					IconNBElement: {
						marginHorizontal: null,
						fontSize: style.iconSize - 5,
					},
					IconElement: {
						marginHorizontal: null,
						fontSize: style.iconSize - 8,
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
				IconElement: {
					width: style.iconSize - 5,
					fontSize: style.iconSize - 2,
				},
				IconNBElement: {
					width: style.iconSize - 5,
					fontSize: style.iconSize - 2,
				},
				paddingRight: style.listItemPadding + 5,
				flex: 0,
				height: 44,
				justifyContent: CENTER,
				alignItems: CENTER,
			},
			BodyElement: {
				TextElement: {
					marginLeft: null,
					fontSize: 17,
				},
				flex: 1,
				height: 44,
				justifyContent: CENTER,
				borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
				borderColor: style.listBorderColor,
			},
			RightElement: {
				TextElement: {
					textAlign: CENTER,
					color: "#8F8E95",
					fontSize: 17,
				},
				IconNBElement: {
					color: "#C8C7CC",
					fontSize: style.iconSize - 10,
					alignSelf: CENTER,
					paddingLeft: 10,
					paddingTop: 3,
				},
				IconElement: {
					color: "#C8C7CC",
					fontSize: style.iconSize - 10,
					alignSelf: CENTER,
					paddingLeft: 10,
					paddingTop: 3,
				},
				SwitchElement: {
					marginRight: itsIOS ? undefined : -5,
					alignSelf: null,
				},
				PickerNBElement: { ...pickerTheme() },
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
				BodyElement: { borderBottomWidth: null },
				RightElement: { borderBottomWidth: null },
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
