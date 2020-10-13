/**
 * for react-native 0.62, checked at 2020-02-17
 * 200825 globalThis로 변경
 */
const ReactNative = require("react-native")

require("/interactors/exceptionHandler")

if (!globalThis.initialized) globalThis.initialized = true
else debugger

const App = require("/examples/Button") // /examples/Form	/apps/Rnrf
const { name: appName } = require("./app.json")
ReactNative.AppRegistry.registerComponent(appName, () => App)
