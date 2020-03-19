const MODULE_NAME$ = "elements/H3"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const H3 = Text

module.exports = connectStyle(H3, MODULE_NAME$)
