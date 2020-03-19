const MODULE_NAME$ = "elements/Segment"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const Segment = View

module.exports = connectStyle(Segment, MODULE_NAME$)
