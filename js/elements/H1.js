console.log("H1", "load")

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const H1 = Text

module.exports = connectStyle(H1, "elements/H1")
