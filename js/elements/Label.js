console.log("Label", "load")

const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { Text } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Label extends Component {
	render() {
		return <Text ref={c => (this._root = c)} {...this.props} />
	}
}

Label.propTypes = {
	...Text.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	floatBack: PropTypes.number,
}

module.exports = connectStyle("NativeBase.Label", {}, mapPropsToStyleNames)(Label)
