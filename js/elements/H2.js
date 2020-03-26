const MODULE_NAME$ = "H2Element"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const H2 = Text

module.exports = connectStyle(H2, MODULE_NAME$)
