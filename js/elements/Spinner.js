const MODULE_NAME$ = "SpinnerElement"
console.debug(MODULE_NAME$)

require("react")
const { ActivityIndicator } = require("react-native")

const { useStyle } = require("/coordinators")

const SpinnerElement = ({ color, ...props }) => {
	const { defaultTheme } = useStyle()
	return (
		<ActivityIndicator
			{...props}
			color={color ? color : props.inverse ? defaultTheme.inverseSpinnerColor : defaultTheme.defaultSpinnerColor}
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

SpinnerElement.displayName = "Spinner"

// const { connectStyle } = require("/utils/style")
module.exports = SpinnerElement // connectStyle(SpinnerElement, MODULE_NAME$)
