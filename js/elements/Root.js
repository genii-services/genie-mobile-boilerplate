const MODULE_NAME$ = "elements/Root"
console.debug(MODULE_NAME$)

const React = require("react")
const { View, ViewPropTypes } = require("react-native")
const PropTypes = require("prop-types")

const { connectStyle } = require("/utils/style")

const { ToastContainer: Toast } = require("./ToastContainer")
const { ActionSheetContainer: ActionSheet } = require("./ActionSheet")

const Root = ({ children, ...props }) => {
	return (
		<View {...props} style={{ flex: 1 }}>
			{children}
			<Toast ref={c => c && (Toast.toastInstance = c)} />
			<ActionSheet ref={c => c && (ActionSheet.actionsheetInstance = c)} />
		</View>
	)
}

Root.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle(Root, MODULE_NAME$)
