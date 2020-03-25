const MODULE_NAME$ = "elements/Root"
console.debug(MODULE_NAME$)

const React = require("react")
const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const ToastContainer = require("./ToastContainer")
const ActionSheet = require("./ActionSheet")

const Root = ({ children, ...props }) => {
	return (
		<View {...props} style={{ flex: 1 }}>
			{children}
			<ToastContainer ref={c => (Toast.instance = c)} />
			<ActionSheet ref={c => (ActionSheet.instance = c)} />
		</View>
	)
}

if (__DEV__) {
	const { ViewPropTypes } = require("react-native")
	const { array, number, object, oneOfType } = require("/utils/propTypes")

	Root.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
	}
}

module.exports = connectStyle(Root, MODULE_NAME$)
