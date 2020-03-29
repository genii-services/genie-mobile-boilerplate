/** Html Element */
const MODULE_NAME$ = "HtmlElement"
console.debug(MODULE_NAME$)

const React = require("react")
// const { View } = require("react-natie")
const { WebView } = require("react-native-webview")

const { OBJECT } = require("/constants")
const { screen } = require("/utils/device")
const { getMarginTop, getMarginRight, getMarginBottom, getMarginLeft } = require("/utils/style")
const { useState, useThis } = require("/hooks")

console.debug("HtmlElement")

const styleBase = `body {
	width:100%!important;
	margin:0!important;
	padding:0!important;
}
body, div, p, span, font {
	font-family:unset!important;
	font-size:10pt!important;
	line-height:15pt!important;
	letter-spacing:-0.7pt!important;
}
body, div, span, font {
	margin:0!important;
	padding:0!important;
}
table {
	width:auto!important; height:auto!important;
	border-collapse:collapse;
	margin-right:10px;
}
tr, td, col {
	width:auto!important; height:auto!important; white-space:normal!important;
}
img:not([mobilenrs]) {
	width:100%!important; height:auto!important;
}
br {
	line-height:50%!important;
}`

// const injectedScript = function() {
// function printStuff(stuff){
// 	var el = document.createElement("pre");
// 	var str = JSON.stringify(stuff);
// 	el.innerHTML = str;
// 	document.body.appendChild(el);
// }
// 	function waitForBridge() {
// 		if (window.postMessage.length !== 1) return setTimeout(waitForBridge, 200)
// 		let docHeight = document.documentElement.clientHeight
// 		let bodyHeight = document.body.clientHeight
// 		let height = docHeight > bodyHeight ? docHeight : bodyHeight
// 		setTimeout(() => window.ReactNativeWebView.postMessage(height.toString()), 2000)
// 	}
// 	waitForBridge()
// }

const injectedScript = `
  	function waitForBridge() {
		if (typeof window.ReactNativeWebView.postMessage !== 'function') return setTimeout(waitForBridge, 200)
		let docHeight = document.documentElement.clientHeight
		let bodyHeight = document.body.clientHeight
		let height = docHeight > bodyHeight ? docHeight : bodyHeight
		setTimeout(() => window.ReactNativeWebView.postMessage(height.toString()), 100)
	}
	waitForBridge()
	true;
` //*.마지막에 true를 추가하지 않으면 자동 실패가 발생

const HtmlElement = props => {
	/* HOOKS */

	const _this = useThis()
	const [_webViewHeight, set_webViewHeight] = useState(screen.height)

	/* props 변경에 따른 state 설정 */
	const { html, baseUrl, css, zoomScale, style, source } = props
	const marginTop = getMarginTop(style)
	const marginRight = getMarginRight(style, 10)
	const marginBottom = getMarginBottom(style)
	const marginLeft = getMarginLeft(style, 10)

	if (_this.isChangedProps("source", { html, baseUrl, css, zoomScale, source })) {
		if (html) {
			const width = screen.width - marginLeft - marginRight
			const viewport = `user-scalable=yes, initial-scale=${zoomScale}, minimum-scale=1.0, maximum-scale=4.0 width=${width}`
			const meta = `<meta name="viewport" content="${viewport}">`
			// let script = injectedScript
			_this.source = {
				html: `${meta}<style>${css || ""}${styleBase}</style><body>${html}</body>`,
				baseUrl: baseUrl || "",
			}
		} else {
			_this.source = typeof source === OBJECT ? source : !!source ? { uri: source } : undefined
		}
	}

	/* HANDLERS */

	const handleOnMessage = e => set_webViewHeight(parseInt(e.nativeEvent.data))

	/* RENDERERS */

	const rootStyle = [
		{
			width: zoomScale == 1 ? screen.width - marginLeft - marginRight : (zoomScale + 1) * screen.width,
			height: zoomScale == 1 ? _webViewHeight : _webViewHeight * zoomScale,
			padding: 0,
			marginTop,
			marginLeft,
			marginBottom,
			marginRight,
		},
		style,
	]
	return (
		<WebView
			style={rootStyle}
			scrollEnabled={false}
			scalesPageToFit={false}
			javaScriptEnabled={true}
			// injectedJavaScript={`(${String(injectedScript)})();`}
			injectedJavaScript={injectedScript}
			onMessage={handleOnMessage}
			source={_this.source}
		/>
	)
	/*
		const runFirst = `
		  document.body.style.backgroundColor = 'red';
		  setTimeout(() => { window.alert('hi') }, 2000);
		  true; // note: this is required, or you'll sometimes get silent failures
		`
		return (
			<View style={{ flex: 1 }}>
				<WebView
					source={{
						uri: "https://github.com/react-native-community/react-native-webview",
					}}
					injectedJavaScript={injectedScript}
					onMessage={e => handleOnMessage(e)}
				/>
			</View>
		)
	*/
}

if (__DEV__) {
	const { any, number, string } = require("/utils/propTypes")
	HtmlElement.propTypes = {
		...WebView.propTypes,
		source: any,
		html: string,
		baseUrl: string,
		initialScale: number,
		maximumScale: number,
		zoomScale: number,
	}
}

HtmlElement.defaultProps = {
	...WebView.defaultProps,
	style: { margin: 10 },
	initialScale: 1,
	maximumScale: 1,
	styleModified: true,
	zoomScale: 1,
}

module.exports = HtmlElement
