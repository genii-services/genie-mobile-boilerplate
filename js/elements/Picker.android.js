const MODULE_NAME$ = "Picker.androidElement"
console.debug(MODULE_NAME$)

const { Picker } = require("@react-native-community/picker")

PickerAndroidElement = Picker

// const { connectStyle } = require("/utils/style")
module.exports = PickerAndroidElement //connectStyle(PickerAndroidElement, "PickerNBElement")
