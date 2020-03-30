const MODULE_NAME$ = "SpinnerElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { ActivityIndicator } = require("react-native")

const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")

const SpinnerElement = ({ color, ...props }) => {
	const [theme] = useStore("theme")

	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle
	return (
		<ActivityIndicator
			{...props}
			color={color ? color : props.inverse ? style.inverseSpinnerColor : style.defaultSpinnerColor}
			size={props.size || "large"}
		/>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	SpinnerElement.propTypes = {
		...ActivityIndicator.propTypes,
		color: string,
		inverse: bool,
	}
}

module.exports = SpinnerElement // connectStyle(SpinnerElement, MODULE_NAME$)
