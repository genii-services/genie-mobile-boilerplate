const MODULE_NAME$ = "TabContainerElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const TabContainerElement = View

module.exports = connectStyle(TabContainerElement, MODULE_NAME$)
