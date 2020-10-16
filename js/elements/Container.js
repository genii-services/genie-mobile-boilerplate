const MODULE_NAME$ = "ContainerElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const ContainerElement = props => <View {...props}/>
ContainerElement.displayName = "Container"

// const { connectStyle } = require("/utils/style")
module.exports = ContainerElement //connectStyle(ContainerElement, MODULE_NAME$)
