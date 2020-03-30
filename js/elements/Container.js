const MODULE_NAME$ = "ContainerElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const ContainerElement = View

module.exports = ContainerElement //connectStyle(ContainerElement, MODULE_NAME$)
