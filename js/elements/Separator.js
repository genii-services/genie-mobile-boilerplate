const MODULE_NAME$ = "SeparatorElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const SeparatorElement = View

module.exports = connectStyle(SeparatorElement, MODULE_NAME$)
