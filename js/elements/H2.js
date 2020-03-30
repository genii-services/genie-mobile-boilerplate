const MODULE_NAME$ = "H2Element"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const H2 = Text

module.exports = H2 //connectStyle(H2, MODULE_NAME$)
