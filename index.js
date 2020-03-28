//*.for react-native 0.62, checked at 2020-02-17

/**
 * @format
 */
const ReactNative = require("react-native")
// ReactNative.unstable_enableLogBox()

// require("/interactors/exceptionHandler")

if (!global.initialized) global.initialized = true
else debugger

const App = require("/examples/Form")
const { name: appName } = require("./app.json")
ReactNative.AppRegistry.registerComponent(appName, () => App)
