const MODULE_NAME$ = "ToastElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { forwardRef } = require("/hooks")

const ToastElement = View

// const { connectStyle } = require("utils/style")
module.exports = ToastElement //connectStyle(ToastElement, MODULE_NAME$)
