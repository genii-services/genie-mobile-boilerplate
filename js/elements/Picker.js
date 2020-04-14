const MODULE_NAME$ = "PickerElement"
console.debug(MODULE_NAME$)

const { Picker } = require("@react-native-community/picker")

const PickerElement = Picker

PickerElement.propTypes = {
	...Picker.propTypes,
}

// const { connectStyle } = require("/utils/style")
module.exports = PickerElement //connectStyle(PickerElement, "PickerNBElement")
