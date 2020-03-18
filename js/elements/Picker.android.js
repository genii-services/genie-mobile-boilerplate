console.log("Picker", "load")

const React = require("react")
const { Component } = React
const { Picker: Picker_ } = require("@react-native-community/picker")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

export default class Picker extends Component {
	render() {
		return (
			<Picker_ ref={c => (this._root = c)} {...this.props}>
				{this.props.children}
			</Picker_>
		)
	}
}

Picker.Item = Picker_.Item

Picker.propTypes = {
	...Picker_.propTypes,
}

module.exports = connectStyle("NativeBase.PickerNB", {}, mapPropsToStyleNames)(Picker)
