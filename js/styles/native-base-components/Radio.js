/** 공통 라이브러리 */
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	return itsIOS
		? {
				".selected": {
					"NativeBase.IconNB": {
						color: theme.radioColor,
						lineHeight: 25,
						height: 20,
					},
				},
				"NativeBase.IconNB": {
					color: "transparent",
					lineHeight: undefined,
					fontSize: undefined,
				},
		  }
		: {
				".selected": {
					"NativeBase.IconNB": {
						color: theme.radioSelectedColorAndroid,
						lineHeight: theme.radioBtnLineHeight,
						height: undefined,
					},
				},
				"NativeBase.IconNB": {
					color: undefined,
					lineHeight: theme.radioBtnLineHeight,
					fontSize: theme.radioBtnSize,
				},
		  }
}
