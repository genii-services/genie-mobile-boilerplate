/** Element Style */
const { CENTER, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	return itsIOS
		? {
				".selected": {
					"elements/IconNB": {
						color: style.radioColor,
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
						color: style.radioSelectedColorAndroid,
						lineHeight: style.radioBtnLineHeight,
						height: undefined,
					},
				},
				"elements/IconNB": {
					color: undefined,
					lineHeight: style.radioBtnLineHeight,
					fontSize: style.radioBtnSize,
				},
		  }
}
