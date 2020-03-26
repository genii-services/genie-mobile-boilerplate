const MODULE_NAME$ = "TabElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const TabElement = View

module.exports = connectStyle(TabElement, MODULE_NAME$)
