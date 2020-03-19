const MODULE_NAME$ = "elements/Label"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const Label = Text

module.exports = connectStyle(Label, MODULE_NAME$)
