const MODULE_NAME$ = "elements/Separator"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const Separator = View

module.exports = connectStyle(Separator, MODULE_NAME$)
