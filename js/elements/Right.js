const MODULE_NAME$ = "RightElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { useStyle } = require("/coordinators")

const RightElement = ({ style, ...props }) => {
	const { stylez } = useStyle(RightElement, { style })
	return <View {...props} style={stylez.root} />
}

if (__DEV__) {
	const { array, number, object, oneOfType, ViewPropTypes } = require("/utils/propTypes")
	RightElement.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
	}
}

RightElement.displayName = "Right"

// const { connectStyle } = require("/utils/style")
module.exports = RightElement //connectStyle(RightElement, MODULE_NAME$)
