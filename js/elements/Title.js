const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { Text } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Title extends Component {
	render() {
		return <Text ref={c => (this._root = c)} numberOfLines={1} {...this.props} />
	}
}

Title.propTypes = {
	...Text.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle("NativeBase.Title", {}, mapPropsToStyleNames)(Title)
console.log("Title", "loaded")
