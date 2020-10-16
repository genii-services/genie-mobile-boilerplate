const MODULE_NAME$ = "TabHeadingElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const TabHeadingElement = props => <View {...props} />

TabHeadingElement.displayName = "TabHeading"

// const { connectStyle } = require("/utils/style")
module.exports = TabHeadingElement //connectStyle(TabHeadingElement, MODULE_NAME$)
