const MODULE_NAME$ = "H3Element"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const H3Element = Text

module.exports = H3Element //connectStyle(H3Element, MODULE_NAME$)
