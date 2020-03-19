const MODULE_NAME$ = "elements/Container"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const Container = View

module.exports = connectStyle(Container, MODULE_NAME$)
