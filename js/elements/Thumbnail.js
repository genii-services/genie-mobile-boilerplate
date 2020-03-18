const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { Image } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Thumbnail extends Component {
	render() {
		return <Image ref={c => (this._root = c)} {...this.props} />
	}
}

Thumbnail.propTypes = {
	...Image.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	square: PropTypes.bool,
	circular: PropTypes.bool,
	size: PropTypes.number,
}

module.exports = connectStyle("NativeBase.Thumbnail", {}, mapPropsToStyleNames)(Thumbnail)

console.log("Thumbnail", "loaded")
