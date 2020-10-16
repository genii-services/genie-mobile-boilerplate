const MODULE_NAME$ = "RootElement"
console.debug(MODULE_NAME$)

require("react")
const { View } = require("react-native")

const { forwardRef } = require("/hooks")
const ToastContainer = require("./ToastContainer")
const ActionSheet = require("./ActionSheet")

const RootElement = ({ children, ...props }) => {
	return (
		<View {...props} style={{ flex: 1 }}>
			{children}
			<ToastContainer />
			<ActionSheet />
		</View>
	)
}

if (__DEV__) {
	const { array, number, object, oneOfType, ViewPropTypes } = require("/utils/propTypes")
	RootElement.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
	}
}

RootElement.displayName = "Root"

// const { connectStyle } = require("/utils/style")
module.exports = RootElement //connectStyle(RootElement, MODULE_NAME$)
