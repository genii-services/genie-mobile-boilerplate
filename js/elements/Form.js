const MODULE_NAME$ = "elements/Form"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const { connectStyle } = require("/utils/style")

const Form = View

module.exports = connectStyle(Form, MODULE_NAME$)
