const MODULE_NAME$ = "RightElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const RightElement = View

module.exports = connectStyle(RightElement, MODULE_NAME$)
