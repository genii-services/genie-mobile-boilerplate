const MODULE_NAME$ = "ToastElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("utils/style")
const { forwardRef } = require("/hooks")

const ToastElement = View

module.exports = ToastElement //connectStyle(ToastElement, MODULE_NAME$)
