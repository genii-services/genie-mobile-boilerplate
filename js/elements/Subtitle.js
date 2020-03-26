const MODULE_NAME$ = "SubtitleElement"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const SubtitleElement = Text

module.exports = connectStyle(SubtitleElement, MODULE_NAME$)
