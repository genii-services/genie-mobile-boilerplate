const MODULE_NAME$ = "FooterTabElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const FooterTab = View

const { connectStyle } = require("/utils/style")
module.exports = FooterTab //connectStyle(FooterTab, MODULE_NAME$)
