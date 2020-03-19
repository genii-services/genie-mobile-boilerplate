const MODULE_NAME$ = "elements/TabContainer"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const TabContainer = View

module.exports = connectStyle(TabContainer, MODULE_NAME$)
