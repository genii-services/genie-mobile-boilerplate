const MODULE_NAME$ = "SubtitleElement"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const SubtitleElement = Text

module.exports = SubtitleElement // connectStyle(SubtitleElement, MODULE_NAME$)
