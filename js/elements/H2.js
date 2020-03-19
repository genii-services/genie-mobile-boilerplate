const MODULE_NAME$ = "elements/H2"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const H2 = Text

module.exports = connectStyle(H2, MODULE_NAME$)
