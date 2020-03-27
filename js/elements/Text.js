const MODULE_NAME$ = "TextElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { Text } = require("react-native")
const _ = require("lodash")

const { forwardRef } = require("/hooks")
const { connectStyle } = require("/utils/style")

const TextElement = forwardRef(({ uppercase, children, ...props }, ref) => {
	const text = uppercase ? React.Children.map(children, child => (_.isString(child) ? _.toUpper(child) : child)) : children
	return (
		<Text ref={ref} {...props}>
			{text}
		</Text>
	)
})

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
}

module.exports = connectStyle(TextElement, MODULE_NAME$)
