const MODULE_NAME$ = "SwitchElement"
console.debug(MODULE_NAME$)

const { Switch } = require("react-native")

const { connectStyle } = require("/utils/style")

const SwitchElement = Switch

module.exports = SwitchElement //connectStyle(SwitchElement, MODULE_NAME$)
