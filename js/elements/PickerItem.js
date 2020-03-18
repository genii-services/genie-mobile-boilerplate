const React = require("react")
const { Component } = React
const { Picker } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Item extends Component {
	render() {
		return <Picker.Item ref={c => (this._root = c)} {...this.props} />
	}
}

Item.propTypes = {
	...Picker.Item.propTypes,
}

module.exports = connectStyle("NativeBase.Item", {}, mapPropsToStyleNames)(Item)

console.log("Item", "loaded")
