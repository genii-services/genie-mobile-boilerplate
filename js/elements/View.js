const MODULE_NAME$ = "elements/View"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const ViewNB = View

module.exports = connectStyle(ViewNB, "elements/ViewNB")
