const MODULE_NAME$ = "LeftElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const LeftElement = props => <View {...props} />

LeftElement.displayName = "Left"

// const { connectStyle } = require("/utils/style")
module.exports = LeftElement //connectStyle(Left, MODULE_NAME$)
