const MODULE_NAME$ = "BodyElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const BodyElement = View

module.exports = connectStyle(BodyElement, MODULE_NAME$)
