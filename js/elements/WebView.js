/** Html Element */
const MODULE_NAME$ = "HtmlElement"
console.debug(MODULE_NAME$)

require("react")
// const { View } = require("react-natie")
const { WebView } = require("react-native-webview")

const WebViewElement = props => <View {...props} />

WebViewElement.displayName = "WebView"

// EXPORTS

module.exports = WebViewElement