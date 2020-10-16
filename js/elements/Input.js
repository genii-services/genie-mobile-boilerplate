const MODULE_NAME$ = "InputElement"
console.debug(MODULE_NAME$)

require("react")
const { TextInput } = require("react-native")

const { forwardRef, useThis } = require("/hooks")
const { useStyle } = require("/coordinators")

const InputElement = ({ disabled, style, ...props }) => {
	const { stylez } = useStyle(MODULE_NAME$, { rounded, style }, (defaultStyle) => ({
		root: [style],
	}))

	return (
		<TextInput
			editable={!disabled}
			underlineColorAndroid="rgba(0,0,0,0)"
			placeholderTextColor={defaultStyle.placeholderTextColor}
			style={stylez.root}
			{...props}
		/>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")

	InputElement.propTypes = {
		...TextInput.propTypes,
		style: oneOfType([object, number, array]),
	}
}

InputElement.displayName = "Input"

// const { connectStyle } = require("/utils/style")
module.exports = InputElement //connectStyle(InputElement, MODULE_NAME$)
