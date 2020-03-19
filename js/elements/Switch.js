const MODULE_NAME$ = "elements/Switch"
console.debug(MODULE_NAME$)

const { Switch: Switch_ } = require("react-native")

const { connectStyle } = require("/utils/style")

const Switch = Switch_

module.exports = connectStyle(Switch, MODULE_NAME$)
