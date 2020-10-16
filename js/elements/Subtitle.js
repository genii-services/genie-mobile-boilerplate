const MODULE_NAME$ = "SubtitleElement"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const SubtitleElement = Text

SubtitleElement.displayName = "Subtitle"

// const { connectStyle } = require("/utils/style")
module.exports = SubtitleElement // connectStyle(SubtitleElement, MODULE_NAME$)
