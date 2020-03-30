const MODULE_NAME$ = "PickerItemElement"
console.debug(MODULE_NAME$)

const { Picker } = require("react-native")

const { connectStyle } = require("/utils/style")

const PickerItemElement = Picker.Item

module.exports = PickerItemElement //connectStyle(PickerItemElement, MODULE_NAME$)
