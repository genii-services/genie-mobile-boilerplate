const MODULE_NAME$ = "InputGroupElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { View } = require("react-native")

const { useStyle } = require("/coordinators")

const InputGroup = ({ rounded, style, ...props }) => {
	const { stylez } = useStyle(InputGroup, { rounded, style }, (defaultStyle) => ({
		root: {
			borderWidth: rounded && 1,
			borderRadius: rounded && defaultStyle.inputGroupRoundedBorderRadius,
		},
	}))

	return <View {...props} style={stylez.root}></View>
}

if (__DEV__) {
	const { bool, ViewPropTypes } = require("/utils/propTypes")
	InputGroup.propTypes = {
		...ViewPropTypes,
		regular: bool,
		underline: bool,
		rounded: bool,
		success: bool,
		error: bool,
		disabled: bool,
	}
}

// const { connectStyle } = require("/utils/style")
module.exports = InputGroup //connectStyle(InputGroup, MODULE_NAME$)
