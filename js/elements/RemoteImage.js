/** RemoteImage Element */
const React = require("react")
const { Image, RefreshControl, TouchableHighlight, Text, View } = require("react-native")
const FastImage = require("react-native-fast-image")

const { FUNCTION, NUMBER, STRING } = require("/constants")
const { ABSOLUTE, CENTER, COLUMN, PC100, ROW } = require("/constants/style")
const { useThis } = require("/hooks")
const { useStyle } = require("/coordinators")

const RemoteImageElement = (props) => {
	const _this = useThis()

	const { stylez } = useStyle(RemoteImageElement)

	const [_loading, set_loading] = useState(false)
	const [_erred, set_erred] = useState(false)

	let { source } = props
	if (typeof source === STRING) source = { uri: source }
	if (_this.source !== source) {
		_this.source = source
		set_loading(true)
	}

	const handleOnLoad = (e) => {
		try {
			let { width, height } = e.nativeEvent
			console.debug(RemoteImageElement, width, height)
			_this.originalWidth = width
			_this.originalHeight = height
			set_loading(false)
		} catch (e) {
			console.warn(RemoteImageElement, e)
		}
	}

	const handleOnError = (e) => {
		//console.debug(RemoteImageElement, e)
		set_loading(false)
		set_erred(true)
	}

	const handleOnRefresh = (e) => {
		const itsFalse = typeof props.onRefresh === String.FUNCTION && props.onRefresh(e)
		if (Boolean.isFalse(itsFalse)) return
		set_loading(true)
		set_erred(false)
	}

	const text = (_loading && props.loadingText) || (_erred && props.erredText)
	const { zoomScale } = props
	let width = _width * zoomScale
	let height, resizeMode, marginTop
	if (_height) {
		// 이미지 높이를 가져온 경우
		resizeMode = props.resizeMode || "cover"
		height = _height * zoomScale
	} else {
		resizeMode = "contain"
		height = _width * props.aspectRatio * zoomScale
	}
	// console.debug(RemoteImageElement, resizeMode, width, height, marginTop)
	return (
		<View style={stylez.container}>
			<TouchableHighlight onPress={props.onPress}>
				<FastImage
					style={{ width, height }}
					source={source}
					resizeMode={resizeMode}
					resizeMethod={props.resizeMethod}
					// onLoadStart={handleOnLoadStart} // 이미지 로드 시작시
					onLoad={handleOnLoad} // 이미지 로드 성공시
					onError={handleOnError} // 이미지 로드 실패시
				/>
			</TouchableHighlight>
			{zoomScale == 1 && text && (
				<View
					style={stylez.loadingArea}
					refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={handleOnRefresh} />}>
					<Text style={stylez.loadingText}>{text}</Text>
				</View>
			)}
		</View>
	)
}

if (__DEV__) {
	const { any, bool, func, number, string } = require("/utils/propTypes")
	RemoteImageElement.propTypes = {
		...Image.propTypes,
		name: string,
		onPress: func,
		source: any,
		loadingVisible: bool,
		zoomScale: number,
		cropTop: number,
		aspectRatio: number,
	}
}

RemoteImageElement.defaultProps = {
	...Image.defaultProps,
	onEndReachedThreshold: 0.025,
	refreshing: false,
	loadingText: "로딩중입니다",
	erredText: "이미지 다운로드에 실패하였습니다",
	zoomScale: 1,
	cropTop: 0,
	aspectRatio: 2,
}

RemoteImageElement.getDefaultStyle = () => {
	return {
		container: {
			flexDirection: ROW,
			flex: 1,
			width: PC100,
			height: PC100,
		},
		loadingArea: {
			width: PC100,
			// height:'50%',
			paddingTop: "40%",
			position: ABSOLUTE,
			flexDirection: COLUMN,
			justifyContent: CENTER,
			alignItems: CENTER,
		},
		loadingImg: {
			width: 100,
			height: 90,
		},
		loadingText: {
			marginTop: 23,
			fontSize: 18,
			color: "#9b9b9b",
			textAlign: CENTER,
		},
	}
}

module.exports = RemoteImageElement
