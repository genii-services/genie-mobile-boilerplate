/** Element Style */
const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const titleTheme = {
		fontSize: theme.titleFontSize,
		fontFamily: theme.titleFontfamily,
		color: theme.titleFontColor,
		fontWeight: itsIOS ? "700" : undefined,
		textAlign: CENTER,
		paddingLeft: itsIOS ? 4 : 0,
		marginLeft: itsIOS ? undefined : -3,
		paddingTop: 1,
	}

	return titleTheme
}
