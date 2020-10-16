const MODULE_NAME$ = "BadgeElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const BadgeElement = props => <View {...props} />
BadgeElement.displayName = "Badge"

// const { connectStyle } = require("/utils/style")
module.exports = BadgeElement //connectStyle(BadgeElement, MODULE_NAME$)
