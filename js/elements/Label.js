const MODULE_NAME$ = "LabelElement"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const LabelElement = Text

module.exports = connectStyle(LabelElement, MODULE_NAME$)
