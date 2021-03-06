/** Element Style */
const MODULE_NAME$ = "styles/elements/CheckBox"
console.debug(MODULE_NAME$)

const { CENTER, HIDDEN, FLEX_END, MATERIAL, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")

module.exports = (style) => {
	return {
		borderRadius: style.CheckboxRadius,
		overflow: HIDDEN,
		width: style.checkboxSize,
		height: style.checkboxSize,
		borderWidth: style.CheckboxBorderWidth,
		paddingLeft: style.CheckboxPaddingLeft - 1,
		paddingBottom: style.CheckboxPaddingBottom,
		left: 10,

		".checked": {
			IconElement: { color: style.checkboxTickColor },
			IconNBElement: { color: style.checkboxTickColor },
		},

		IconElement: {
			color: TRANSPARENT,
			lineHeight: style.CheckboxIconSize,
			marginTop: style.CheckboxIconMarginTop,
			fontSize: style.CheckboxFontSize,
		},
	}
}
