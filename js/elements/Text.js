const MODULE_NAME$ = "TextElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { Text } = require("react-native")
const _ = require("lodash")

const { forwardRef } = require("/hooks")
const { useStyle } = require("/coordinators")

const TextElement = ({ note, uppercase, children, style, ...props }) => {
	const text = uppercase ? React.Children.map(children, (child) => (_.isString(child) ? _.toUpper(child) : child)) : children
	const { stylez } = useStyle(TextElement, { note, style })
	return (
		<Text {...props} style={stylez.style}>
			{text}
		</Text>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType } = require("/utils/propTypes")
	TextElement.propTypes = {
		...Text.propTypes,
		uppercase: bool,
		style: oneOfType([object, number, array]),
	}
}

TextElement.defaultProps = {
	uppercase: false,
	note: false,
}

// const { connectStyle } = require("/utils/style")
module.exports = TextElement // connectStyle(TextElement, MODULE_NAME$)
