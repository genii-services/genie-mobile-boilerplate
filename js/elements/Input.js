const MODULE_NAME$ = "elements/Input"
console.debug(MODULE_NAME$)

const React = require("react")
const { TextInput } = require("react-native")

const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")
const variable = require("/styles/themes/default")

const Input = props => {
	const [theme] = useStore("theme")
	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	return (
		<TextInput
			editable={!props.disabled}
			underlineColorAndroid="rgba(0,0,0,0)"
			placeholderTextColor={variables.inputColorPlaceholder}
			{...props}
		/>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("prop-types")

	Input.propTypes = {
		...TextInput.propTypes,
		style: oneOfType([object, number, array]),
	}
}

module.exports = connectStyle(Input, MODULE_NAME$)
