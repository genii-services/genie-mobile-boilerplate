const MODULE_NAME$ = "elements/Picker.android"
console.debug(MODULE_NAME$)

const { Picker: Picker_ } = require("@react-native-community/picker")

const { connectStyle } = require("/utils/style")

Picker = Picker_

module.exports = connectStyle(Picker, "elements/PickerNB")
