const MODULE_NAME$ = "LabelElement"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const LabelElement = props => <Text {...props} />

LabelElement.displayName = "Label"

// const { connectStyle } = require("/utils/style")
module.exports = LabelElement //connectStyle(LabelElement, MODULE_NAME$)
