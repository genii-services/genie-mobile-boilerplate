const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { View, ViewPropTypes } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Left extends Component {
	render() {
		return <View ref={c => (this._root = c)} {...this.props} />
	}
}

Left.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle("NativeBase.Left", {}, mapPropsToStyleNames)(Left)

console.log("Left", "loaded")
