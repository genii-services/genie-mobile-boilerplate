const MODULE_NAME$ = "FormElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const Form = View

module.exports = Form //connectStyle(Form, MODULE_NAME$)
