const MODULE_NAME$ = "CardItemElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { TouchableOpacity, View } = require("react-native")

const { forwardRef } = require("/hooks")
const { useStyle } = require("/coordinators")

const CardItemElement = ({ header, cardBody, footer, button, ...props }) => {
	const { stylez } = useStyle(CardItemElement, { header, cardBody, footer, button })
	return props.button ? (
		<TouchableOpacity activeOpacity={0.2} {...props} style={stylez.root} />
	) : (
		<View {...props} style={stylez.root} />
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType } = require("/utils/propTypes")
	CardItemElement.propTypes = {
		...TouchableOpacity.propTypes,
		style: oneOfType([object, number, array]),
		header: bool,
		cardBody: bool,
		footer: bool,
		button: bool,
	}
}

// const { connectStyle } = require("/utils/style")
module.exports = CardItemElement //connectStyle(CardItemElement, MODULE_NAME$)
