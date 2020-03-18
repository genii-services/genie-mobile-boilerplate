/** 공통 라이브러리 */
const { CENTER } = require("/constants/style")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		".group": {
			height: 50,
			paddingVertical: theme.listItemPadding - 8,
			paddingTop: theme.listItemPadding + 12,
			".bordered": {
				height: 50,
				paddingVertical: theme.listItemPadding - 8,
				paddingTop: theme.listItemPadding + 12,
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
			paddingTop: theme.listItemPadding + 2,
			paddingBottom: theme.listItemPadding,
			borderBottomWidth: theme.borderWidth,
			borderTopWidth: theme.borderWidth,
			borderColor: theme.listBorderColor,
		},
		"NativeBase.Text": {
			fontSize: theme.tabBarTextSize - 2,
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
		paddingLeft: theme.listItemPadding + 5,
	}
}
