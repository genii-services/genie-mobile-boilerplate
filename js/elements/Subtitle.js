const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { Text } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Subtitle extends Component {
	render() {
		return <Text ref={c => (this._root = c)} {...this.props} />
	}
}

Subtitle.propTypes = {
	...Text.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle("NativeBase.Subtitle", {}, mapPropsToStyleNames)(Subtitle)
console.log("Subtitle", "loaded")
