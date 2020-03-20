const MODULE_NAME$ = "elements/Switch"
console.debug(MODULE_NAME$)

const ReactNative = require("react-native")

const { connectStyle } = require("/utils/style")

const Switch = ReactNative.Switch

module.exports = connectStyle(Switch, MODULE_NAME$)
