const MODULE_NAME$ = "TabContainerElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const TabContainerElement = props => <View {...props} />

TabContainerElement.displayName = "TabContainer"

// const { connectStyle } = require("/utils/style")
module.exports = TabContainerElement //connectStyle(TabContainerElement, MODULE_NAME$)
