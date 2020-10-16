const MODULE_NAME$ = "SeparatorElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const SeparatorElement = View

SeparatorElement.displayName = "Separator"

// const { connectStyle } = require("/utils/style")
module.exports = SeparatorElement //connectStyle(SeparatorElement, MODULE_NAME$)
