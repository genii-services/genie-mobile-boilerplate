/** 공통 라이브러리 */
const React = require("react")
// const { View } = require("react-native")
const { WebView } = require("react-native-webview")

const { screen } = require("/utils/device")

console.debug("Html")

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

function makeHtml(props) {
	let width = screen.width - 20
	let viewport = `user-scalable=yes, initial-scale=${props.zoomScale}, minimum-scale=1.0, maximum-scale=4.0 width=${width}`
	let meta = `<meta name="viewport" content="${viewport}">`
	let css = props.css || ""
	css += styleBase
	// let script = injectedScript
	return {
		html: `${meta}<style>${css}</style><body>${props.html}</body>`,
		baseUrl: props.baseUrl || "",
	}
}

const Html = props => {
	/* HOOKS */

	const [_html, set_html] = useState()
	const [_zoomScale, set_zoomScale] = useState()
	const [_source, set_source] = useState()
	const [_webViewHeight, set_webViewHeight] = useState(screen.height)

	/* props 변경에 따른 state 설정 */

	const { html, zoomScale } = props
	if (_html !== html || _zoomScale !== zoomScale) {
		set_html(html)
		set_zoomScale(zoomScale)
		set_source(makeHtml(props))
	}

	/* HANDLERS */

	const handleOnMessage = e => set_webViewHeight(parseInt(e.nativeEvent.data))

	/* RENDERERS */

	const width = zoomScale == 1 ? screen.width - 20 : (zoomScale + 1) * screen.width
	const height = zoomScale == 1 ? _webViewHeight : _webViewHeight * zoomScale
	return (
		<WebView
			style={[{ width, height, padding: 0, margin: 10 }]}
			scrollEnabled={false}
			scalesPageToFit={false}
			javaScriptEnabled={true}
			// injectedJavaScript={`(${String(injectedScript)})();`}
			injectedJavaScript={injectedScript}
			onMessage={handleOnMessage}
			source={_source}
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
	const { any, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	Html.propTypes = {
		...WebView.propTypes,
		source: any,
		html: string,
		baseUrl: string,
		initialScale: number,
		maximumScale: number,
		zoomScale: number,
	}
}

Html.defaultProps = {
	...WebView.defaultProps,
	initialScale: 1,
	maximumScale: 1,
	styleModified: true,
	zoomScale: 1,
}

module.exports = Html
