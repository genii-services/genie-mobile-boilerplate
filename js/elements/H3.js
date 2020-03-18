const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { Text } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class H3 extends Component {
	render() {
		return <Text ref={c => (this._root = c)} {...this.props} />
	}
}

const childrenType = function(props, propName, component) {
	let error
	const prop = props[propName]
	React.Children.forEach(prop, child => {
		if (typeof child !== "string" && typeof child !== "number") {
			error = new Error(`${component} should have only string or number`)
		}
	})
	return error
}

H3.propTypes = {
	...Text.propTypes,
	children: childrenType,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle("NativeBase.H3", {}, mapPropsToStyleNames)(H3)

console.log("H3", "loaded")
