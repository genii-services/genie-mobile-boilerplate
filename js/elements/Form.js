const MODULE_NAME$ = "FormElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const FormElement = props => <View {...props}/>

FormElement.displayName = "Form"

// const { connectStyle } = require("/utils/style")
module.exports = FormElement //connectStyle(FormElement, MODULE_NAME$)
