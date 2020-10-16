const MODULE_NAME$ = "H1Element"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const H1Element = props => <Text {...props}/>

H1Element.displayName = "H1"

// const { connectStyle } = require("/utils/style")
module.exports = H1Element //connectStyle(H1Element, MODULE_NAME$)
