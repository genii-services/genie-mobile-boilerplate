const MODULE_NAME$ = "PickerElement"
console.debug(MODULE_NAME$)

const { Picker: Picker_ } = require("@react-native-community/picker")

const { connectStyle } = require("/utils/style")

const Picker = Picker_

Picker.propTypes = {
	...Picker.propTypes,
}

module.exports = Picker //connectStyle(Picker, "PickerNBElement")
