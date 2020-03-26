const MODULE_NAME$ = "InputElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { TextInput } = require("react-native")

const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")

const Input = props => {
	const [theme] = useStore("theme")
	const defaultStyle = theme["@@shoutem.theme/themeStyle"].defaultStyle
	return (
		<TextInput
			editable={!props.disabled}
			underlineColorAndroid="rgba(0,0,0,0)"
			placeholderTextColor={defaultStyle.placeholderTextColor}
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

module.exports = connectStyle(Input, MODULE_NAME$)
