const MODULE_NAME$ = "SwipeRowElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { Animated, PanResponder, View } = require("react-native")

const { ABSOLUTE, HIDDEN, ROW, SPACE_BETWEEN } = require("/constants/style")
const { useThis } = require("/hooks")
const { connectStyle } = require("/utils/style")

const { Left } = require("./Left")
const { Right } = require("./Right")
const { Body } = require("./Body")
const { ListItem } = require("./ListItem")

const PREVIEW_OPEN_DELAY = 700
const PREVIEW_CLOSE_DELAY = 300

const SwipeRowElement = props => {
	const _this = useThis()
	if (!_this.ref) {
		_this.horizontalSwipeGestureBegan = false
		_this.swipeInitialX = null
		_this.parentScrollEnabled = true
		_this.ranPreview = false
		_this._translateX = new Animated.Value(0)
	}
	const [_dimensionsSet, set_dimensionsSet] = useState(false)
	const [_hiddenHeight, set_hiddenHeight] = useState(0)
	const [_hiddenWidth, set_hiddenWidth] = useState(0)

	useEffect(() => {
		_this._panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (e, gs) => handleOnMoveShouldSetPanResponder(e, gs),
			onPanResponderMove: (e, gs) => handlePanResponderMove(e, gs),
			onPanResponderRelease: (e, gs) => handlePanResponderEnd(e, gs),
			onPanResponderTerminate: (e, gs) => handlePanResponderEnd(e, gs),
			onShouldBlockNativeResponder: _ => false,
		})
	}, [])

	const getPreviewAnimation = (toValue, delay) => {
		return Animated.timing(_this._translateX, {
			duration: props.previewDuration,
			toValue,
			delay,
			useNativeDriver: true,
		})
	}

	const onContentLayout = e => {
		set_dimensionsSet(!props.recalculateHiddenLayout)
		set_hiddenHeight(e.nativeEvent.layout.height)
		set_hiddenWidth(e.nativeEvent.layout.width)

		if (props.preview && !_this.ranPreview) {
			_this.ranPreview = true
			const previewOpenValue = props.previewOpenValue || props.rightOpenValue * 0.5
			getPreviewAnimation(previewOpenValue, PREVIEW_OPEN_DELAY).start(_ => {
				getPreviewAnimation(0, PREVIEW_CLOSE_DELAY).start()
			})
		}
	}

	const handleOnMoveShouldSetPanResponder = (e, gs) => {
		const { dx } = gs
		return Math.abs(dx) > props.directionalDistanceChangeThreshold
	}

	const handlePanResponderMove = (e, gestureState) => {
		const { dx, dy } = gestureState
		const absDx = Math.abs(dx)
		const absDy = Math.abs(dy)

		// this check may not be necessary because we don't capture the move until we pass the threshold
		// just being extra safe here
		if (absDx > props.directionalDistanceChangeThreshold || absDy > props.directionalDistanceChangeThreshold) {
			// we have enough to determine direction
			if (absDy > absDx && !_this.horizontalSwipeGestureBegan) {
				// user is moving vertically, do nothing, listView will handle
				return
			}

			// user is moving horizontally
			if (_this.parentScrollEnabled) {
				// disable scrolling on the listView parent
				_this.parentScrollEnabled = false
				props.setScrollEnabled && props.setScrollEnabled(false)
			}

			if (_this.swipeInitialX === null) {
				// set tranlateX value when user started swiping
				_this.swipeInitialX = _this._translateX._value
			}
			if (!_this.horizontalSwipeGestureBegan) {
				_this.horizontalSwipeGestureBegan = true
				props.swipeGestureBegan && props.swipeGestureBegan()
			}

			let newDX = _this.swipeInitialX + dx
			if (props.disableLeftSwipe && newDX < 0) newDX = 0
			if (props.disableRightSwipe && newDX > 0) newDX = 0

			if (props.stopLeftSwipe && newDX > props.stopLeftSwipe) newDX = props.stopLeftSwipe
			if (props.stopRightSwipe && newDX < props.stopRightSwipe) newDX = props.stopRightSwipe

			_this._translateX.setValue(newDX)
		}
	}

	const handlePanResponderEnd = (e, gestureState) => {
		// re-enable scrolling on listView parent
		if (!_this.parentScrollEnabled) {
			_this.parentScrollEnabled = true
			props.setScrollEnabled && props.setScrollEnabled(true)
		}

		// finish up the animation
		let toValue = 0
		if (_this._translateX._value >= 0) {
			// trying to open right
			if (_this._translateX._value > props.leftOpenValue * (props.swipeToOpenPercent / 100)) {
				// we're more than halfway
				toValue = props.leftOpenValue
			}
		} else {
			// trying to open left
			if (_this._translateX._value < props.rightOpenValue * (props.swipeToOpenPercent / 100)) {
				// we're more than halfway
				toValue = props.rightOpenValue
			}
		}

		manuallySwipeRow(toValue)
	}

	/*
	 * This method is called by SwipeListView
	 */
	const closeRow = () => manuallySwipeRow(0)

	const openLeftRow = () => manuallySwipeRow(props.leftOpenValue)

	const openRightRow = () => manuallySwipeRow(props.rightOpenValue)

	const manuallySwipeRow = toValue => {
		Animated.spring(_this._translateX, {
			toValue,
			friction: props.friction,
			tension: props.tension,
			useNativeDriver: true,
		}).start(_ => {
			if (toValue === 0) props.onRowDidClose && props.onRowDidClose()
			else props.onRowDidOpen && props.onRowDidOpen()
		})

		if (toValue === 0) props.onRowClose && props.onRowClose()
		else props.onRowOpen && props.onRowOpen(toValue)

		// reset everything
		_this.swipeInitialX = null
		_this.horizontalSwipeGestureBegan = false
	}

	const renderMainContent = () => {
		// We do this annoying if statement for performance.
		// We don't want the onLayout func to run after it runs once.
		if (_dimensionsSet) {
			return (
				<Animated.View
					{..._this._panResponder.panHandlers}
					style={{
						transform: [{ translateX: _this._translateX }],
						zIndex: 2,
					}}>
					{!props.list ? (
						<ListItem list style={props.style}>
							{props.body}
						</ListItem>
					) : (
						<View style={[{ backgroundColor: WHITE }, props.style]}>{props.body}</View>
					)}
				</Animated.View>
			)
		}
		return (
			<Animated.View
				{..._this._panResponder.panHandlers}
				onLayout={e => onContentLayout(e)}
				style={{
					transform: [{ translateX: _this._translateX }],
					zIndex: 2,
				}}>
				{!props.list ? (
					<ListItem list style={props.style}>
						{props.body}
					</ListItem>
				) : (
					<View style={[{ backgroundColor: WHITE }, props.style]}>{props.body}</View>
				)}
			</Animated.View>
		)
	}

	return (
		<View ref={c => (_this.ref = c)} style={props.style}>
			<View
				style={[
					styles.hidden,
					{
						height: _hiddenHeight,
						flex: 1,
						flexDirection: ROW,
						justifyContent: SPACE_BETWEEN,
					},
				]}>
				<Left style={{ width: props.leftOpenValue, zIndex: 1 }}>{props.left}</Left>
				<Body style={{ flex: 0 }} />
				<Right style={{ width: -props.rightOpenValue, zIndex: 1 }}>{props.right}</Right>
			</View>
			{renderMainContent()}
		</View>
	)
}
SwipeRowElement.defaultProps = {
	leftOpenValue: 0,
	rightOpenValue: 0,
	closeOnRowPress: true,
	disableLeftSwipe: false,
	disableRightSwipe: false,
	recalculateHiddenLayout: false,
	preview: false,
	previewDuration: 300,
	directionalDistanceChangeThreshold: 2,
	swipeToOpenPercent: 50,
}

const styles = {
	container: {
		// As of RN 0.29 flex: 1 is causing all rows to be the same height
		// flex: 1
	},
	hidden: {
		bottom: 0,
		left: 0,
		overflow: HIDDEN,
		position: ABSOLUTE,
		right: 0,
		top: 0,
	},
}

module.exports = SwipeRowElement //connectStyle(SwipeRowElement, MODULE_NAME$)
