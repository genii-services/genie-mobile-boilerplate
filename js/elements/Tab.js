const MODULE_NAME$ = "elements/Tab"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const Tab = View

module.exports = connectStyle(Tab, MODULE_NAME$)
