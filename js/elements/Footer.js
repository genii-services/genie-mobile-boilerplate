const MODULE_NAME$ = "FooterElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { View } = require("react-native")

const { screen, itsIphoneX } = require("/utils/device")
const { useState, useStore } = require("/hooks")
const { useStyle } = require("/coordinators")

const FooterElement = (props) => {
	if (!itsIphoneX) return <View {...props} />

	const { style } = props
	const itsPortrait = screen.isPortrait()

	const { stylez } = useStyle(FooterElement, { style }, (defaultStyle) => {
		const inset = defaultStyle.Inset
		const InsetValues = itsPortrait ? inset.portrait : inset.landscape

		const oldHeight = style.height || style[1] ? style[1].height || style[0].height : style[0].height
		const height = oldHeight + InsetValues.bottomInset

		let paddingBottom
		if (style[1]) {
			if (style[1].padding || style[1].paddingTop) {
				paddingBottom = (style[1].paddingTop || style[1].padding) + InsetValues.bottomInset
			}
		} else if (style.padding && style.paddingTop) {
			paddingBottom = (style.paddingTop || style.padding) + InsetValues.bottomInset
		} else {
			paddingBottom = InsetValues.bottomInset
		}
		return { view: [style, { height, paddingBottom }] }
	})
	return <View {...props} style={stylez.view} />
}

if (__DEV__) {
	const { array, number, object, oneOfType, ViewPropTypes } = require("/utils/propTypes")
	FooterElement.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
	}
}

// const { connectStyle } = require("/utils/style")
module.exports = FooterElement //connectStyle(FooterElement, MODULE_NAME$)
