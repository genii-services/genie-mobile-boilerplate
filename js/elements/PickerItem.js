const MODULE_NAME$ = "PickerItemElement"
console.debug(MODULE_NAME$)

const { Picker } = require("react-native")

const PickerItemElement = Picker.Item

PickerItemElement.displayName = "PickerItem"

// const { connectStyle } = require("/utils/style")
module.exports = PickerItemElement //connectStyle(PickerItemElement, MODULE_NAME$)
