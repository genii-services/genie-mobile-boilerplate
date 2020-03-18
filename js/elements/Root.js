const React = require("react")
const { Component } = React
const { View, ViewPropTypes } = require("react-native")
const PropTypes = require("prop-types")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

const { ToastContainer: Toast } = require("./ToastContainer")
const { ActionSheetContainer: ActionSheet } = require("./Actionsheet")

class Root extends Component {
	render() {
		return (
			<View ref={c => (this._root = c)} {...this.props} style={{ flex: 1 }}>
				{this.props.children}
				<Toast
					ref={c => {
						if (c) Toast.toastInstance = c
					}}
				/>
				<ActionSheet
					ref={c => {
						if (c) ActionSheet.actionsheetInstance = c
					}}
				/>
			</View>
		)
	}
}

Root.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle("NativeBase.Root", {}, mapPropsToStyleNames)(Root)

console.log("Root", "loaded")
