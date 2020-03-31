const MODULE_NAME$ = "CardItemElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { TouchableOpacity, View } = require("react-native")

const { forwardRef } = require("/hooks")
const { connectStyle } = require("/utils/style")

const CardItemElement = props => {
	return props.button ? <TouchableOpacity activeOpacity={0.2} {...props} /> : <View {...props} />
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

module.exports = CardItemElement //connectStyle(CardItemElement, MODULE_NAME$)
