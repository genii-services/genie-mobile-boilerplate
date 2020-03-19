const MODULE_NAME$ = "elements/Subtitle"
console.log(MODULE_NAME$, "load")

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const Subtitle = Text

module.exports = connectStyle(Subtitle, MODULE_NAME$)
