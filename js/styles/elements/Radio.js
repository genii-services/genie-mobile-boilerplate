/** 공통 라이브러리 */
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
					color: "transparent",
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
