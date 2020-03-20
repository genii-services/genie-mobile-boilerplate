//*.for react-native 0.62, checked at 2020-02-17

/**
 * @format
 */
const { AppRegistry, unstable_enableLogBox } = require("react-native")
// unstable_enableLogBox()
// require("/interactors/exceptionHandler")

if (!global.initialized) global.initialized = true
else debugger

const App = require("/apps/Test")
const { name: appName } = require("./app.json")
AppRegistry.registerComponent(appName, () => App)
