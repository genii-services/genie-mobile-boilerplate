const MODULE_NAME$ = "ToastElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("utils/style")

const ToastElement = View

module.exports = connectStyle(ToastElement, MODULE_NAME$)
