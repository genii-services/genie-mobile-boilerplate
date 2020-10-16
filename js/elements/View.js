const MODULE_NAME$ = "ViewElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const ViewElement = props => <View {...props} />

ViewElement.displayName = "View"

// const { connectStyle } = require("/utils/style")
module.exports = ViewElement //connectStyle(ViewElement, MODULE_NAME$)
