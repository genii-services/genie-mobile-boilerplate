const MODULE_NAME$ = "H2Element"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const H2Element = props => <Text {...props}/>

H2Element.displayName = "H2"

// const { connectStyle } = require("/utils/style")
module.exports = H2Element //connectStyle(H2Element, MODULE_NAME$)
