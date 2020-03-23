/** Element Style */
const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const subtitleTheme = {
		fontSize: theme.subTitleFontSize,
		fontFamily: theme.titleFontfamily,
		color: theme.subtitleColor,
		textAlign: CENTER,
		paddingLeft: itsIOS ? 4 : 0,
		marginLeft: itsIOS ? undefined : -3,
	}

	return subtitleTheme
}
