const MODULE_NAME$ = "elements/CardItem"
console.debug(MODULE_NAME$)

const React = require("react")
const PropTypes = require("prop-types")
const { TouchableOpacity, View } = require("react-native")
const { connectStyle } = require("/utils/style")

const CardItem = props => {
	return props.button ? <TouchableOpacity activeOpacity={0.2} {...props} /> : <View {...props} />
}

CardItem.propTypes = {
	...TouchableOpacity.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	header: PropTypes.bool,
	cardBody: PropTypes.bool,
	footer: PropTypes.bool,
	button: PropTypes.bool,
}

module.exports = connectStyle(CardItem, MODULE_NAME$)
