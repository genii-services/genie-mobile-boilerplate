require("react")

const { View, Text } = require("react-native")
const { WebView } = require("react-native-webview")

const { ABSOLUTE, BLACK, CENTER, PC100, TRANSPARENT, WHITE } = require("/constants/style")
const { itsIOS, itsIphoneX, screen } = require("/utils/device")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { Content, Button, Html, Icon } = require("/elements")

const HtmlViewer = props => {
	const router = useRouter()

	const setZoomRef = node => {
		//the ScrollView has a scrollResponder which allows us to access more methods to control the ScrollView component
		console.debug(this, "setZoomRef", node)
		if (node) {
			_this.zoomRef = node
			_this.scrollResponderRef = _this.zoomRef.getScrollResponder()
		}
	}

	const handleResetZoomScale = event => {
		console.debug(this, "handleResetZoomScale", event)
		/*
		_this.scrollResponderRef.scrollResponderZoomTo({
			x: 0,
			y: 0,
			width: props.zoomWidth,
			height: props.zoomHeight,
			animated: true,
		})*/
	}

	//console.debug(this, props)
	let { html, source } = props
	let top = itsIOS ? (itsIphoneX ? 30 : 10) : 0
	let iosHeight = itsIphoneX ? 30 : 0
	console.debug(this, source)
	return (
		<View style={{ backgroundColor: WHITE, height: PC100 }}>
			<Text
				style={{
					width: PC100,
					height: iosHeight + 48,
					textAlign: CENTER,
					paddingTop: top + 10,
					backgroundColor: "#c0c0c0",
				}}>
				{props.title}
			</Text>
			<Content style={{ backgroundColor: WHITE, height: PC100 }}>
				{html ? (
					<Html html={html} baseUrl={props.baseUrl} styleModified={false} maximumScale={1} />
				) : source ? (
					<WebView style={{ width: PC100, height: PC100, borderWidth: 1, backgroundColor: BLACK }} source={source} />
				) : (
					<View />
				)}
			</Content>
			<Button transparent style={{ position: ABSOLUTE, left: 0, top, marginTop: 0, paddingTop: 0 }} onPress={router.pop}>
				<Icon style={{ fontSize: 24, color: "gray", backgroundColor: TRANSPARENT }} name="ios-close" />
			</Button>
		</View>
	)
}

HtmlViewer.defaultProps = {
	doAnimateZoomReset: false,
	minimumZoomScale: 1,
	maximumZoomScale: 2,
	zoomWidth: screen.width,
	zoomHeight: screen.height,
}

module.exports = HtmlViewer
