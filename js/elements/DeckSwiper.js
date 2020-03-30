const MODULE_NAME$ = "DeckSwiperElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { View, Animated, PanResponder } = require("react-native")
const clamp = require("clamp")

const { ABSOLUTE, COLUMN, LEFT, RIGHT } = require("/constants/style")
const { connectStyle } = require("/utils/style")

const SWIPE_THRESHOLD = 120

const DeckSwiper = props => {
	const [_pan, set_pan] = useState(new Animated.ValueXY())
	// const [_pan2, set_pan2] = useState(new Animated.ValueXY())
	const [_enter, set_enter] = useState(new Animated.Value(0.8))
	const [_selectedItem, set_selectedItem] = useState(props.dataSource[0])
	const [_selectedItem2, set_selectedItem2] = useState(props.dataSource[1])
	const [_card1Top, set_card1Top] = useState(true)
	const [_card2Top, set_card2Top] = useState(false)
	const [_fadeAnim, set_fadeAnim] = useState(new Animated.Value(0.8))
	const [_looping, set_looping] = useState(typeof props.looping === "undefined" ? true : props.looping)
	const [_disabled, set_disabled] = useState(props.dataSource.length === 0)
	const [_lastCard, set_lastCard] = useState(props.dataSource.length === 1)

	setPanresponder()

	useEffect(() => {
		const { dataSource } = props
		if (dataSource.length !== props.dataSource.length) {
			if (dataSource.length <= 1) {
				set_selectedItem(dataSource[0])
				set_selectedItem2(undefined)
				set_disabled(dataSource.length === 0)
				set_lastCard(dataSource.length === 1)
				return
			}

			const visibleIndex = dataSource.indexOf(_selectedItem)
			const currentIndex = visibleIndex < 0 ? visibleIndex + 1 : visibleIndex
			const nextIndex = currentIndex + 1 === dataSource.length ? 0 : currentIndex + 1

			set_selectedItem(dataSource[currentIndex])
			set_selectedItem2(dataSource[nextIndex])
		}
	})

	const getCardStyles = () => {
		const [translateX, translateY] = [_pan.x, _pan.y]
		// let [translateX, translateY] = [_pan2.x, _pan2.y];

		const rotate = _pan.x.interpolate({ inputRange: [-700, 0, 700], outputRange: ["-10deg", "0deg", "10deg"] })

		const opacity = _pan.x.interpolate({ inputRange: [-320, 0, 320], outputRange: [0.9, 1, 0.9] })
		const scale = _enter

		const animatedCardStyles = { transform: [{ translateX }, { translateY }, { rotate }], opacity }
		const animatedCardStyles2 = { transform: [{ scale }] }

		return [animatedCardStyles, animatedCardStyles2]
	}

	const setPanresponder = () => {
		_this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => Math.abs(gestureState.dx) > 5,

			onPanResponderGrant: () => {
				_pan.setOffset({ x: _pan.x._value, y: _pan.y._value })
				_pan.setValue({ x: 0, y: 0 })
			},

			onPanResponderMove: (e, gestureState) => {
				if (gestureState.dx > 20) props.onSwiping && props.onSwiping(RIGHT, gestureState.dx)
				else if (gestureState.dx < -20) props.onSwiping && props.onSwiping(LEFT, gestureState.dx)

				let val = Math.abs(gestureState.dx * 0.0013)
				if (0.2 < val) val = 0.2

				Animated.timing(_fadeAnim, { toValue: 0.8 + val }).start()
				Animated.spring(_enter, { toValue: 0.8 + val, friction: 7 }).start()
				Animated.event([null, { dx: _pan.x }])(e, gestureState)
			},

			onPanResponderRelease: (e, { vx, vy }) => {
				props.onSwiping && props.onSwiping(null)
				let velocity = 0 <= vx ? clamp(vx, 4.5, 10) : vx < 0 ? clamp(vx * -1, 4.5, 10) * -1 : undefined

				if (Math.abs(_pan.x._value) > SWIPE_THRESHOLD) {
					if (velocity > 0) {
						props.onSwipeRight && props.onSwipeRight(_selectedItem)
						selectNext()
					} else {
						props.onSwipeLeft && props.onSwipeLeft(_selectedItem)
						selectNext()
					}
					Animated.decay(_pan, { velocity: { x: velocity, y: vy }, deceleration: 0.98 }).start(_resetState.bind(this))
				} else {
					Animated.spring(_pan, { toValue: { x: 0, y: 0 }, friction: 4 }).start()
				}
			},
		})
	}

	const _resetState = () => {
		_pan.setValue({ x: 0, y: 0 })
		_enter.setValue(0.8)
		_fadeAnim.setValue(0.8)
		set_card1Top(!_card1Top)
		set_card2Top(!_card2Top)
		if (props.onSwiping) props.onSwiping(null)
	}

	const swipeRight = () => {
		if (props.onSwiping) props.onSwiping(RIGHT)
		setTimeout(() => {
			Animated.timing(_fadeAnim, { toValue: 1 }).start()
			Animated.spring(_enter, { toValue: 1, friction: 7 }).start()
			selectNext()
			Animated.decay(_pan, { velocity: { x: 8, y: 1 }, deceleration: 0.98 }).start(_resetState.bind(this))
		}, 300)
	}

	const swipeLeft = () => {
		if (props.onSwiping) props.onSwiping(LEFT)
		setTimeout(() => {
			Animated.timing(_fadeAnim, { toValue: 1 }).start()
			Animated.spring(_enter, { toValue: 1, friction: 7 }).start()
			selectNext()
			Animated.decay(_pan, { velocity: { x: -8, y: 1 }, deceleration: 0.98 }).start(_resetState.bind(this))
		}, 300)
	}

	const selectNext = () => {
		const dataSource = props.dataSource
		const currentIndex = dataSource.indexOf(_selectedItem)

		// if not looping, check for these conditionals and if true return from selectNext()
		if (!_looping) {
			// reached end -> only display static renderEmpty() -> no swiping
			if (currentIndex === dataSource.length - 1) {
				return set_disabled(true)
			} else if (currentIndex === dataSource.length - 2) {
				// show last card with renderEmpty() component behind it
				return setTimeout(() => {
					set_selectedItem(dataSource[currentIndex + 1])
					setTimeout(() => {
						set_lastCard(true)
					}, 350)
				}, 50)
			}
		}

		const nextIndexes = findNextIndexes(currentIndex)
		setTimeout(() => {
			set_selectedItem(props.dataSource[nextIndexes[0]])
			setTimeout(() => set_selectedItem2(props.dataSource[nextIndexes[1]]), 350)
		}, 50)

		return null
	}

	const findNextIndexes = currentIndex => {
		const newIdx = currentIndex + 1
		const newIdx2 = currentIndex + 2
		const dataSourceLastIdx = props.dataSource.length - 1
		return dataSourceLastIdx < newIdx2 && dataSourceLastIdx === newIdx
			? [newIdx, 0]
			: dataSourceLastIdx < newIdx
			? [0, 1]
			: [newIdx, newIdx2]
	}
	const rootStyle = { position: "relative", flexDirection: COLUMN }
	const topCardStyle = { position: ABSOLUTE, top: 0, right: 0, left: 0 }
	const prevAnimatedViewStyle = [getCardStyles()[1], topCardStyle, { opacity: _fadeAnim }]
	const nextAnimatedViewStyle = [getCardStyles()[0], topCardStyle]

	if (_disabled) {
		// disable swiping and renderEmpty
		return (
			<View style={rootStyle}>
				<View>{props.renderEmpty && props.renderEmpty()}</View>
			</View>
		)
	}
	return (
		<View style={rootStyle}>
			{_selectedItem && (
				<View>
					<Animated.View style={prevAnimatedViewStyle} {..._this._panResponder.panHandlers}>
						{!_lastCard
							? props.renderBottom
								? props.renderBottom(_selectedItem2)
								: props.renderItem(_selectedItem2)
							: props.renderEmpty && props.renderEmpty() // display renderEmpty underneath last viable card
						}
					</Animated.View>
					<Animated.View style={nextAnimatedViewStyle} {..._this._panResponder.panHandlers}>
						{!_lastCard && props.renderTop ? props.renderTop(_selectedItem) : props.renderItem(_selectedItem)}
					</Animated.View>
				</View>
			)}
		</View>
	)
}

if (__DEV__) {
	const { array, number, object, oneOfType, ViewPropTypes } = require("/utils/propTypes")
	DeckSwiper.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
		// eslint-disable-next-line react/forbid-prop-types
		dataSource: array,
	}
}

module.exports = DeckSwiper //connectStyle(DeckSwiper, MODULE_NAME$)
