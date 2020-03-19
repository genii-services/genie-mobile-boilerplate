const MODULE_NAME$ = "elements/TabHeading"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const TabHeadingNB = View

module.exports = connectStyle(TabHeadingNB, MODULE_NAME$)
