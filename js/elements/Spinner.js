const MODULE_NAME$ = "elements/Spinner"
console.debug(MODULE_NAME$)

const React = require("react")
const { ActivityIndicator } = require("react-native")

const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")
const variable = require("/styles/themes/default")

const Spinner = ({ color, ...props }) => {
	const [theme] = useStore("theme")

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	return (
		<ActivityIndicator
			{...props}
			color={color ? color : props.inverse ? variables.inverseSpinnerColor : variables.defaultSpinnerColor}
			size={props.size || "large"}
		/>
	)
}

if (__DEV__) {
	const PropTypes = require("prop-types")
	Spinner.propTypes = {
		...ActivityIndicator.propTypes,
		color: PropTypes.string,
		inverse: PropTypes.bool,
	}
}

module.exports = connectStyle(Spinner, MODULE_NAME$)
