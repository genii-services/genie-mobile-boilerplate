/** Element Style */
const { CENTER, HIDDEN, FLEX_END, MATERIAL, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	const Icon = {
		color: TRANSPARENT,
		lineHeight: style.CheckboxIconSize,
		marginTop: style.CheckboxIconMarginTop,
		fontSize: style.CheckboxFontSize,
	}
	return {
		".checked": {
			"elements/Icon": { color: style.checkboxTickColor },
			"elements/IconNB": { color: style.checkboxTickColor },
		},
		"elements/Icon": Icon,
		"elements/IconNB": Icon,
		borderRadius: style.CheckboxRadius,
		overflow: HIDDEN,
		width: style.checkboxSize,
		height: style.checkboxSize,
		borderWidth: style.CheckboxBorderWidth,
		paddingLeft: style.CheckboxPaddingLeft - 1,
		paddingBottom: style.CheckboxPaddingBottom,
		left: 10,
	}
}
