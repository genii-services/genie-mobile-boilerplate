/** Element Style */
const { CENTER } = require("/constants/style")

module.exports = style => {
	return {
		".group": {
			height: 50,
			paddingVertical: style.listItemPadding - 8,
			paddingTop: style.listItemPadding + 12,
			".bordered": {
				height: 50,
				paddingVertical: style.listItemPadding - 8,
				paddingTop: style.listItemPadding + 12,
			},
		},
		".bordered": {
			".noTopBorder": {
				borderTopWidth: 0,
			},
			".noBottomBorder": {
				borderBottomWidth: 0,
			},
			height: 35,
			paddingTop: style.listItemPadding + 2,
			paddingBottom: style.listItemPadding,
			borderBottomWidth: style.borderWidth,
			borderTopWidth: style.borderWidth,
			borderColor: style.listBorderColor,
		},
		"elements/Text": {
			fontSize: style.tabBarTextSize - 2,
			color: "#777",
		},
		".noTopBorder": {
			borderTopWidth: 0,
		},
		".noBottomBorder": {
			borderBottomWidth: 0,
		},
		height: 38,
		backgroundColor: "#F0EFF5",
		flex: 1,
		justifyContent: CENTER,
		paddingLeft: style.listItemPadding + 5,
	}
}
