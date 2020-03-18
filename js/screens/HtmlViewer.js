const React = require("react")

const { View, Text } = require("react-native")
const { Content, Button, Icon } = require("native-base")
const { WebView } = require("react-native-webview")

const { CENTER } = require("/constants/style")
const { itsIOS, itsIphoneX, screen } = require("/utils/device")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { Html } = require("/elements")

const HtmlViewer = props => {
	const router = useRouter()

	const setZoomRef = node => {
		//the ScrollView has a scrollResponder which allows us to access more methods to control the ScrollView component
		console.debug(this, "setZoomRef", node)
		if (node) {
			this.zoomRef = node
			this.scrollResponderRef = this.zoomRef.getScrollResponder()
		}
	}

	const handleResetZoomScale = event => {
		console.debug(this, "handleResetZoomScale", event)
		/*
		this.scrollResponderRef.scrollResponderZoomTo({
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
		<View style={{ backgroundColor: "white", height: "100%" }}>
			<Text
				style={{
					width: "100%",
					height: iosHeight + 48,
					textAlign: CENTER,
					paddingTop: top + 10,
					backgroundColor: "#c0c0c0",
				}}>
				{props.title}
			</Text>
			<Content style={{ backgroundColor: "white", height: "100%" }}>
				{html ? (
					<Html html={html} baseUrl={props.baseUrl} styleModified={false} maximumScale={1} />
				) : source ? (
					<WebView style={{ width: "100%", height: "100%", borderWidth: 1, backgroundColor: "black" }} source={source} />
				) : (
					<View />
				)}
			</Content>
			<Button transparent style={{ position: "absolute", left: 0, top, marginTop: 0, paddingTop: 0 }} onPress={router.pop}>
				<Icon style={{ fontSize: 24, color: "gray", backgroundColor: "transparent" }} name="ios-close" />
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
