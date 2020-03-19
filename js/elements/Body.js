const MODULE_NAME$ = "elements/Body"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const Body = View

module.exports = connectStyle(Body, MODULE_NAME$)
