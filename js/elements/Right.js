const MODULE_NAME$ = "elements/Right"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const Right = View

module.exports = connectStyle(Right, MODULE_NAME$)
