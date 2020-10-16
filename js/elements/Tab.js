const MODULE_NAME$ = "TabElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const TabElement = props => <View {...props} />

TabElement.displayName = "Tab"

// const { connectStyle } = require("/utils/style")
module.exports = TabElement //connectStyle(TabElement, MODULE_NAME$)
