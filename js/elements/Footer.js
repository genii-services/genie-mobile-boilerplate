const MODULE_NAME$ = "elements/Footer"
console.debug(MODULE_NAME$)

const React = require("react")
const { View } = require("react-native")

const { connectStyle } = require("/utils/style")
const { useState, useStore } = require("/hooks")
const variable = require("/styles/themes/default")

const Footer = props => {
	const [theme] = useStore("theme")
	const [_orientation, set_orientation] = useState(variable.deviceHeight > variable.deviceWidth ? "portrait" : "landscape")

	const layoutChange = val => {
		const maxComp = Math.max(variable.deviceWidth, variable.deviceHeight)
		set_orientation(val.width >= maxComp ? "landscape" : "portrait")
	}

	const calculateHeight = (mode, inSet) => {
		const { style } = props
		let inset = inSet || variable.Inset

		const InsetValues = mode === "portrait" ? inset.portrait : inset.landscape
		let oldHeight = style.height !== undefined ? style.height : style[1] ? style[1].height || style[0].height : style[0].height

		const height = oldHeight + InsetValues.bottomInset
		return height
	}

	const calculatePadder = (mode, inSet) => {
		const { style } = props
		let inset = inSet || variable.Inset

		const InsetValues = mode === "portrait" ? inset.portrait : inset.landscape
		let bottomPadder = null
		if (style[1] !== undefined) {
			if (style[1].padding !== undefined || style[1].paddingTop !== undefined) {
				bottomPadder = (style[1].paddingTop || style[1].padding) + InsetValues.bottomInset
			}
		} else if (style.padding !== undefined && style.paddingTop !== undefined) {
			bottomPadder = (style.paddingTop || style.padding) + InsetValues.bottomInset
		} else {
			bottomPadder = InsetValues.bottomInset
		}
		return bottomPadder
	}

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	return variables.isIphoneX ? (
		<View
			{...props}
			onLayout={e => layoutChange(e.nativeEvent.layout)}
			style={[
				style,
				{
					height: calculateHeight(_orientation, variables.Inset),
					paddingBottom: calculatePadder(_orientation, variables.Inset),
				},
			]}
		/>
	) : (
		<View {...props} />
	)
}

if (__DEV__) {
	const { ViewPropTypes } = require("react-native")
	const { array, bool, number, object, oneOfType, string } = require("prop-types")

	Footer.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
	}
}
module.exports = connectStyle(Footer, MODULE_NAME$)
