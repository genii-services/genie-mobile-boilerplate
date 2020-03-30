const MODULE_NAME$ = "SegmentElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const SegmentElement = View

module.exports = SegmentElement //connectStyle(SegmentElement, MODULE_NAME$)
