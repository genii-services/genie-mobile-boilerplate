const MODULE_NAME$ = "FooterTabElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const FooterTab = View

module.exports = connectStyle(FooterTab, MODULE_NAME$)
