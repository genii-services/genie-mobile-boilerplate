const MODULE_NAME$ = "Picker.androidElement"
console.debug(MODULE_NAME$)

const { Picker } = require("@react-native-community/picker")

const { connectStyle } = require("/utils/style")

PickerAndroidElement = Picker

module.exports = PickerAndroidElement //connectStyle(PickerAndroidElement, "PickerNBElement")
