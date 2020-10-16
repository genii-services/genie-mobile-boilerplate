const MODULE_NAME$ = "SwitchElement"
console.debug(MODULE_NAME$)

const { Switch } = require("react-native")

const SwitchElement = props => <Switch {...props} />

SwitchElement.displayName = "Switch"

// const { connectStyle } = require("/utils/style")
module.exports = SwitchElement //connectStyle(SwitchElement, MODULE_NAME$)
