const MODULE_NAME$ = "InputGroupElement"
console.debug(MODULE_NAME$)

require("react")
const { View } = require("react-native")

const { useStyle } = require("/coordinators")

const InputGroupElement = ({ rounded, style, ...props }) => {
	const { stylez } = useStyle(InputGroupElement, { rounded, style }, (defaultStyle) => ({
		root: {
			borderWidth: rounded && 1,
			borderRadius: rounded && defaultStyle.inputGroupRoundedBorderRadius,
		},
	}))

	return <View {...props} style={stylez.root}></View>
}

if (__DEV__) {
	const { bool, ViewPropTypes } = require("/utils/propTypes")
	InputGroupElement.propTypes = {
		...ViewPropTypes,
		regular: bool,
		underline: bool,
		rounded: bool,
		success: bool,
		error: bool,
		disabled: bool,
	}
}

InputGroupElement.displayName = "InputGroup"

// const { connectStyle } = require("/utils/style")
module.exports = InputGroupElement //connectStyle(InputGroup, MODULE_NAME$)
