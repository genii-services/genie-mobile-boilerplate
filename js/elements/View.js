const MODULE_NAME$ = "ViewElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const ViewElement = View

module.exports = connectStyle(ViewElement, MODULE_NAME$)
