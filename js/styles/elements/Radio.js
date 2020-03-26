/** Element Style */
const { CENTER, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
	return itsIOS
		? {
				".selected": {
					IconNBElement: {
						color: style.radioColor,
						lineHeight: 25,
						height: 20,
					},
				},
				IconNBElement: {
					color: TRANSPARENT,
					lineHeight: undefined,
					fontSize: undefined,
				},
		  }
		: {
				".selected": {
					IconNBElement: {
						color: style.radioSelectedColorAndroid,
						lineHeight: style.radioBtnLineHeight,
						height: undefined,
					},
				},
				IconNBElement: {
					color: undefined,
					lineHeight: style.radioBtnLineHeight,
					fontSize: style.radioBtnSize,
				},
		  }
}
