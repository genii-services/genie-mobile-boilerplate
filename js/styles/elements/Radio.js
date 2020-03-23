/** Element Style */
const { CENTER, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return itsIOS
		? {
				".selected": {
					"elements/IconNB": {
						color: theme.radioColor,
						lineHeight: 25,
						height: 20,
					},
				},
				"elements/IconNB": {
					color: TRANSPARENT,
					lineHeight: undefined,
					fontSize: undefined,
				},
		  }
		: {
				".selected": {
					"elements/IconNB": {
						color: theme.radioSelectedColorAndroid,
						lineHeight: theme.radioBtnLineHeight,
						height: undefined,
					},
				},
				"elements/IconNB": {
					color: undefined,
					lineHeight: theme.radioBtnLineHeight,
					fontSize: theme.radioBtnSize,
				},
		  }
}
