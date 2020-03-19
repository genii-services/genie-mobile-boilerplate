/** 공통 라이브러리 */
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return {
		".checked": {
			"elements/Icon": {
				color: theme.checkboxTickColor,
			},
			"elements/IconNB": {
				color: theme.checkboxTickColor,
			},
		},
		"elements/Icon": {
			color: "transparent",
			lineHeight: theme.CheckboxIconSize,
			marginTop: theme.CheckboxIconMarginTop,
			fontSize: theme.CheckboxFontSize,
		},
		"elements/IconNB": {
			color: "transparent",
			lineHeight: theme.CheckboxIconSize,
			marginTop: theme.CheckboxIconMarginTop,
			fontSize: theme.CheckboxFontSize,
		},
		borderRadius: theme.CheckboxRadius,
		overflow: "hidden",
		width: theme.checkboxSize,
		height: theme.checkboxSize,
		borderWidth: theme.CheckboxBorderWidth,
		paddingLeft: theme.CheckboxPaddingLeft - 1,
		paddingBottom: theme.CheckboxPaddingBottom,
		left: 10,
	}
}
