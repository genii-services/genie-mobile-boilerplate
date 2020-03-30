const MODULE_NAME$ = "LeftElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")
const { connectStyle } = require("/utils/style")

const LeftElement = View

module.exports = LeftElement //connectStyle(Left, MODULE_NAME$)
