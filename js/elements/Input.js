const MODULE_NAME$ = "InputElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { TextInput } = require("react-native")

const { connectStyle } = require("/utils/style")
const { forwardRef, useStore, useThis } = require("/hooks")
const { useStyle } = require("/coordinators")

const Input = ({ disabled, style, ...props }) => {
	const { stylez } = useStyle(MODULE_NAME$, { rounded, style }, defaultStyle => ({
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

	Input.propTypes = {
		...TextInput.propTypes,
		style: oneOfType([object, number, array]),
	}
}

module.exports = Input //connectStyle(Input, MODULE_NAME$)
