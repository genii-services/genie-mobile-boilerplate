/** Element Style */
const { CENTER, HIDDEN, FLEX_END, MATERIAL, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const Icon = {
		color: TRANSPARENT,
		lineHeight: theme.CheckboxIconSize,
		marginTop: theme.CheckboxIconMarginTop,
		fontSize: theme.CheckboxFontSize,
	}
	return {
		".checked": {
			"elements/Icon": { color: theme.checkboxTickColor },
			"elements/IconNB": { color: theme.checkboxTickColor },
		},
		"elements/Icon": Icon,
		"elements/IconNB": Icon,
		borderRadius: theme.CheckboxRadius,
		overflow: HIDDEN,
		width: theme.checkboxSize,
		height: theme.checkboxSize,
		borderWidth: theme.CheckboxBorderWidth,
		paddingLeft: theme.CheckboxPaddingLeft - 1,
		paddingBottom: theme.CheckboxPaddingBottom,
		left: 10,
	}
}
