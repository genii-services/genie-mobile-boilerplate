const MODULE_NAME$ = "TabHeadingElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const TabHeadingElement = View

module.exports = connectStyle(TabHeadingElement, MODULE_NAME$)
