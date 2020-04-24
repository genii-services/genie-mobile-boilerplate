/** Element Style */
const MODULE_NAME$ = "styles/elements/CardItem"
console.debug(MODULE_NAME$)

const { StyleSheet } = require("react-native")

const { CENTER, FLEX_START, ROW } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = (style) => {
	const transparentButton = {
		paddingVertical: null,
		paddingHorizontal: null,

		TextElement: {
			fontSize: style.DefaultFontSize - 3,
			color: style.sTabBarActiveTextColor,
		},
		IconElement: {
			fontSize: style.iconSize - 10,
			color: style.sTabBarActiveTextColor,
			marginHorizontal: null,
		},
	}

	return {
		alignItems: CENTER,
		backgroundColor: style.cardDefaultBg,
		borderRadius: style.cardBorderRadius,
		flexDirection: ROW,
		padding: style.cardItemPadding + 5,
		paddingVertical: style.cardItemPadding,

		".bordered": {
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderColor: style.cardBorderColor,
		},
		".content": {
			TextElement: {
				color: itsIOS ? "#555" : "#222",
				fontSize: style.DefaultFontSize - 2,
			},
		},
		".cardBody": { padding: -5, TextElement: { marginTop: 5 } },
		".first": {
			borderTopLeftRadius: style.cardBorderRadius,
			borderTopRightRadius: style.cardBorderRadius,
		},
		".footer": {
			TextElement: {
				fontSize: 16,
				fontWeight: itsIOS ? "600" : "500",
			},
			".bordered": {
				TextElement: {
					color: style.brandPrimary,
					fontWeight: itsIOS ? "600" : "500",
				},
				borderTopWidth: style.borderWidth,
			},
			borderBottomWidth: null,
		},
		".header": {
			TextElement: {
				fontSize: 16,
				fontWeight: itsIOS ? "600" : "500",
			},
			".bordered": {
				TextElement: {
					color: style.brandPrimary,
					fontWeight: itsIOS ? "600" : "500",
				},
				borderBottomWidth: style.borderWidth,
			},
			borderBottomWidth: null,
			paddingVertical: style.cardItemPadding + 5,
		},
		".last": {
			borderBottomLeftRadius: style.cardBorderRadius,
			borderBottomRightRadius: style.cardBorderRadius,
		},

		BodyElement: {
			TextElement: {
				".note": {
					color: style.listNoteColor,
					fontWeight: "200",
					marginRight: 20,
				},
			},
			ButtonElement: {
				".transparent": {
					...transparentButton,
					paddingRight: style.cardItemPadding + 5,
					alignSelf: "stretch",
				},
			},
			flex: 1,
			alignSelf: "stretch",
			alignItems: FLEX_START,
		},
		IconElement: {
			width: style.iconSize + 5,
			fontSize: style.iconSize - 2,
		},
		LeftElement: {
			BodyElement: {
				TextElement: {
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
			IconElement: {
				fontSize: style.iconSize,
			},
			IconNBElement: {
				fontSize: style.iconSize,
			},
			TextElement: {
				marginLeft: 10,
				alignSelf: CENTER,
			},
			ButtonElement: {
				".transparent": {
					...transparentButton,
					paddingRight: style.cardItemPadding + 5,
				},
			},
			flex: 1,
			flexDirection: ROW,
			alignItems: CENTER,
		},
		RightElement: {
			BadgeElement: {
				alignSelf: null,
			},
			ButtonElement: {
				".transparent": transparentButton,
				alignSelf: null,
			},
			IconElement: { alignSelf: null, fontSize: style.iconSize - 8, color: style.cardBorderColor },
			IconNBElement: { alignSelf: null, fontSize: style.iconSize - 8, color: style.cardBorderColor },
			TextElement: { fontSize: style.fontSize, alignSelf: null },
			ThumbnailElement: { alignSelf: null },
			ImageElement: { alignSelf: null },
			RadioElement: { alignSelf: null },
			CheckboxElement: { alignSelf: null },
			SwitchElement: { alignSelf: null },
			flex: 0.8,
		},
		TextElement: {
			".note": {
				color: style.listNoteColor,
				fontWeight: "200",
			},
		},
	}
}
