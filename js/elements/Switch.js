const React = require("react")
const { Component } = React
const { Switch: SwitchNB } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Switch extends Component {
	render() {
		return <SwitchNB ref={c => (this._root = c)} {...this.props} />
	}
}

Switch.propTypes = {
	...Switch.propTypes,
}

module.exports = connectStyle("NativeBase.Switch", {}, mapPropsToStyleNames)(Switch)

console.log("Switch", "loaded")
