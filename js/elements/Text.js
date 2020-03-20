const MODULE_NAME$ = "elements/Text"
console.debug(MODULE_NAME$)

const React = require("react")
const { Text: RNText } = require("react-native")
const _ = require("lodash")

const { connectStyle } = require("/utils/style")

const Text = ({ uppercase, children, ...props }) => {
	const text = uppercase ? React.Children.map(children, child => (_.isString(child) ? _.toUpper(child) : child)) : children
	return <RNText {...props}>{text}</RNText>
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("prop-types")
	Text.propTypes = {
		...RNText.propTypes,
		uppercase: bool,
		style: oneOfType([object, number, array]),
	}
}

Text.defaultProps = {
	uppercase: false,
}

module.exports = connectStyle(Text, MODULE_NAME$)
