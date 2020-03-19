const MODULE_NAME$ = "elements/Badge"
console.log("Badge", "load")

const React = require("react")
const { View } = require("react-native")
const { connectStyle } = require("/utils/style")

const Badge = View

module.exports = connectStyle(Badge, MODULE_NAME$)
