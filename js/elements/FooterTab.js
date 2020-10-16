const MODULE_NAME$ = "FooterTabElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const FooterTabElement = props => <View {...props}/>

FooterTabElement.displayName = "FooterTab"

// const { connectStyle } = require("/utils/style")
module.exports = FooterTabElement //connectStyle(FooterTabElement, MODULE_NAME$)
