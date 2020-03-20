const MODULE_NAME$ = "elements/Picker.android"
console.debug(MODULE_NAME$)

const React = require("react")
const { Component } = React
const { Picker: Picker_ } = require("@react-native-community/picker")

const { connectStyle } = require("/utils/style")

export default const Picker = props => {
	render() {
		return <Picker_ {...this.props}>{this.props.children}</Picker_>
	}
}

Picker.Item = Picker_.Item

Picker.propTypes = {
	...Picker_.propTypes,
}

module.exports = connectStyle(Picker, "elements/PickerNB")
