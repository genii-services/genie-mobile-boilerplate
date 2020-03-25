const MODULE_NAME$ = "elements/CardItem"
console.debug(MODULE_NAME$)

const React = require("react")
const { TouchableOpacity, View } = require("react-native")
const { connectStyle } = require("/utils/style")

const CardItem = props => {
	return props.button ? <TouchableOpacity activeOpacity={0.2} {...props} /> : <View {...props} />
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")

	CardItem.propTypes = {
		...TouchableOpacity.propTypes,
		style: oneOfType([object, number, array]),
		header: bool,
		cardBody: bool,
		footer: bool,
		button: bool,
	}
}

module.exports = connectStyle(CardItem, MODULE_NAME$)
