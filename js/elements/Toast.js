const MODULE_NAME$ = "elements/Toast"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("utils/style")

const Toast = View

module.exports = connectStyle(Toast, MODULE_NAME$)
