const MODULE_NAME$ = "SegmentElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const SegmentElement = View

SegmentElement.displayName = "Segment"

// const { connectStyle } = require("/utils/style")
module.exports = SegmentElement //connectStyle(SegmentElement, MODULE_NAME$)
