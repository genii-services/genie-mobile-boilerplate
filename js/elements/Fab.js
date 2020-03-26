const MODULE_NAME$ = "FabElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { Platform, Animated, TouchableOpacity, TouchableNativeFeedback, View } = require("react-native")
const { remove, merge, clone } = require("lodash")

const { ABSOLUTE, BLACK, CENTER, COLUMN, LEFT, RIGHT, ROW, WHITE } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const { computeProps } = require("/utils/props")
const { connectStyle, flattenStyle } = require("/utils/style")

const { createAnimatedComponent, useThis } = require("/hooks")

const Button = require("./Button")

const DIRECTION = {
	DOWN: "down",
	LEFT,
	RIGHT,
	UP: "up",
}

const POSITION = {
	BOTTOM_LEFT: "bottomLeft",
	BOTTOM_RIGHT: "bottomRight",
	TOP_LEFT: "topLeft",
	TOP_RIGHT: "topRight",
}

const defaultThemeStyle = {
	fabBackgroundColor: "blue",
	fabBorderRadius: 28,
	fabBottom: 0,
	fabButtonBorderRadius: 20,
	fabButtonHeight: 40,
	fabButtonLeft: 7,
	fabButtonMarginBottom: 10,
	fabContainerBottom: 20,
	fabDefaultPosition: 20,
	fabElevation: 4,
	fabIconColor: WHITE,
	fabIconSize: 24,
	fabShadowColor: BLACK,
	fabShadowOffsetHeight: 2,
	fabShadowOffsetWidth: 0,
	fabShadowOpacity: 0.4,
	fabShadowRadius: 2,
	fabWidth: 56,
}

const AnimatedFab = createAnimatedComponent(Button)

const Fab = props => {
	const { direction, position } = props

	const _this = useThis()
	_this.containerHeight = new Animated.Value(defaultThemeStyle.fabWidth)
	_this.containerWidth = new Animated.Value(0)
	_this.buttonScale = new Animated.Value(0)
	const [_buttons, set_buttons] = useState()
	const [_active, set_active] = useState(false)

	useEffect(() => {
		const childrenArray = React.Children.toArray(props.children)
		const icon = remove(childrenArray, item => {
			if (item.type.displayName === "Styled(Button)") return true
			return null
		})
		// eslint-disable-next-line react/no-did-mount-set-state
		set_buttons(icon.length)
		_this.activeTimer = setTimeout(() => set_active(props.active), 0)
		return () => _this.activeTimer && clearTimeout(_this.activeTimer)
	}, [])

	const fabStyle = {
		height: defaultThemeStyle.fabWidth,
		width: defaultThemeStyle.fabWidth,
		borderRadius: defaultThemeStyle.fabBorderRadius,
		elevation: defaultThemeStyle.fabElevation,
		shadowColor: defaultThemeStyle.fabShadowColor,
		shadowOffset: {
			width: defaultThemeStyle.fabShadowOffsetWidth,
			height: defaultThemeStyle.fabShadowOffsetHeight,
		},
		shadowOpacity: defaultThemeStyle.fabShadowOpacity,
		justifyContent: CENTER,
		alignItems: CENTER,
		shadowRadius: defaultThemeStyle.fabShadowRadius,
		position: ABSOLUTE,
		bottom: defaultThemeStyle.fabBottom,
		backgroundColor: defaultThemeStyle.fabBackgroundColor,
	}

	const getOtherButtonStyle = (child, i) => {
		const { active, direction } = props
		const type = {
			top: direction && fabOtherBtns(direction, i).top,
			left: direction ? fabOtherBtns(direction, i).left : 8,
			right: direction ? fabOtherBtns(direction, i).right : 0,
			bottom: direction ? fabOtherBtns(direction, i).bottom : active === false ? (itsIOS ? 8 : 8) : i * 50 + 50,
		}
		return merge(
			{
				position: ABSOLUTE,
				height: defaultThemeStyle.fabButtonHeight,
				width: defaultThemeStyle.fabButtonHeight,
				left: defaultThemeStyle.fabButtonLeft,
				borderRadius: defaultThemeStyle.fabButtonBorderRadius,
				transform: _active ? [{ scale: new Animated.Value(1) }] : [{ scale: _this.buttonScale }],
				marginBottom: defaultThemeStyle.fabButtonMarginBottom,
				backgroundColor: defaultThemeStyle.fabBackgroundColor,
			},
			flattenStyle(child.props.style),
			type
		)
	}

	const getContainerStyle = () =>
		merge(
			{
				position: ABSOLUTE,
				top: position && fabTopValue(position).top,
				bottom: position ? fabTopValue(position).bottom : defaultThemeStyle.fabContainerBottom,
				right: position ? fabTopValue(position).right : defaultThemeStyle.fabContainerBottom,
				left: position && fabTopValue(position).left,
				width: defaultThemeStyle.fabWidth,
				height: _this.containerHeight,
				flexDirection: direction ? (direction === DIRECTION.LEFT || direction === DIRECTION.RIGHT ? ROW : COLUMN) : COLUMN,
				alignItems: CENTER,
			},
			props.containerStyle
		)

	const prepareButtonProps = child => {
		const inp = clone(child.props)
		delete inp.style
		const defaultProps = {}
		return computeProps(inp, defaultProps)
	}

	const fabTopValue = pos => {
		switch (pos) {
			case POSITION.TOP_LEFT:
				return {
					top: defaultThemeStyle.fabDefaultPosition,
					bottom: undefined,
					left: defaultThemeStyle.fabDefaultPosition,
					right: undefined,
				}
			case POSITION.BOTTOM_RIGHT:
				return {
					top: undefined,
					bottom: defaultThemeStyle.fabDefaultPosition,
					left: undefined,
					right: defaultThemeStyle.fabDefaultPosition,
				}
			case POSITION.BOTTOM_LEFT:
				return {
					top: undefined,
					bottom: defaultThemeStyle.fabDefaultPosition,
					left: defaultThemeStyle.fabDefaultPosition,
					right: undefined,
				}
			case POSITION.TOP_RIGHT:
				return {
					top: defaultThemeStyle.fabDefaultPosition,
					bottom: undefined,
					left: undefined,
					right: defaultThemeStyle.fabDefaultPosition,
				}
		}
		return null
	}

	const fabOtherBtns = (direction, i) => {
		const { active } = props
		switch (direction) {
			case DIRECTION.UP:
				return { top: undefined, bottom: active === false ? (itsIOS ? 50 : 5) : i * 50 + 65, left: 8, right: 0 }
			case DIRECTION.LEFT:
				return {
					top: 8,
					bottom: 0,
					left: active === false ? (itsIOS ? 8 : 8) : -(i * 50 + defaultThemeStyle.fabWidth + 2),
					right: 0,
				}
			case DIRECTION.DOWN:
				return { top: active === false ? (itsIOS ? 50 : 8) : i * 50 + 73, bottom: 0, left: 8, right: 0 }
			case DIRECTION.RIGHT:
				return { top: 8, bottom: 0, left: active === false ? (itsIOS ? 50 : 8) : i * 50 + 73, right: 0 }
		}
		return null
	}

	const prepareFabProps = () => {
		const defaultProps = { style: fabStyle }
		const incomingProps = clone(props)
		delete incomingProps.onPress

		return computeProps(incomingProps, defaultProps)
	}

	const upAnimate = () => {
		if (!props.active) {
			Animated.spring(_this.containerHeight, { toValue: _buttons * 51.3 + defaultThemeStyle.fabWidth }).start()
			Animated.spring(_this.buttonScale, { toValue: 1, useNativeDriver: true }).start()
		} else {
			set_active(false)
			Animated.spring(_this.containerHeight, { toValue: defaultThemeStyle.fabWidth }).start()
			Animated.spring(_this.buttonScale, { toValue: 0, useNativeDriver: true }).start()
		}
	}

	const leftAnimate = () => {
		if (!props.active) {
			Animated.spring(_this.containerWidth, { toValue: _buttons * 51.3 + defaultThemeStyle.fabWidth }).start()
			Animated.spring(_this.buttonScale, { toValue: 1, useNativeDriver: true }).start()
		} else {
			set_active(false)
			Animated.spring(_this.containerHeight, { toValue: defaultThemeStyle.fabWidth }).start()
			Animated.spring(_this.buttonScale, { toValue: 0, useNativeDriver: true }).start()
		}
	}

	const rightAnimate = () => {
		if (!props.active) {
			Animated.spring(_this.containerWidth, { toValue: _buttons * 51.3 + defaultThemeStyle.fabWidth }).start()
			Animated.spring(_this.buttonScale, { toValue: 1, useNativeDriver: true }).start()
		} else {
			set_active(false)
			Animated.spring(_this.containerHeight, { toValue: defaultThemeStyle.fabWidth }).start()
			Animated.spring(_this.buttonScale, { toValue: 0, useNativeDriver: true }).start()
		}
	}

	const downAnimate = () => {
		if (!props.active) {
			Animated.spring(_this.containerHeight, { toValue: defaultThemeStyle.fabWidth }).start()
			Animated.spring(_this.buttonScale, { toValue: 1, useNativeDriver: true }).start()
		} else {
			set_active(false)
			Animated.spring(_this.containerHeight, { toValue: defaultThemeStyle.fabWidth }).start()
			Animated.spring(_this.buttonScale, { toValue: 0, useNativeDriver: true }).start()
		}
	}
	const _animate = () => {
		const {
			props: { direction, position },
		} = this

		if (direction) {
			if (direction === DIRECTION.UP) {
				if (position === POSITION.TOP_LEFT || position === POSITION.TOP_RIGHT) {
					console.warn("Passing direction = up with position = topLeft/topRight is not suggested.")
				} else {
					upAnimate()
				}
			} else if (direction === DIRECTION.LEFT) {
				if (position === POSITION.TOP_LEFT || position === POSITION.BOTTOM_LEFT) {
					console.warn("Passing direction = left with position = topLeft/bottomLeft is not suggested.")
				} else {
					leftAnimate()
				}
			} else if (direction === DIRECTION.RIGHT) {
				if (position === POSITION.TOP_RIGHT || position === POSITION.BOTTOM_RIGHT) {
					console.warn("Passing direction = right with position = topRight/bottomRight is not suggested.")
				} else {
					rightAnimate()
				}
			} else if (direction === DIRECTION.DOWN) {
				if (position === POSITION.BOTTOM_LEFT || position === POSITION.BOTTOM_RIGHT) {
					console.warn("Passing direction = down with position = bottomLeft/bottomRight is not suggested.")
				} else {
					downAnimate()
				}
			}
		} else {
			upAnimate()
		}
	}

	const fabOnPress = () => {
		if (props.onPress) {
			props.onPress()
			_animate()
			_this.activeTimer = setTimeout(() => {
				set_active(props.active)
			}, 100)
		}
	}

	const renderButtons = () => {
		const childrenArray = React.Children.toArray(props.children)
		const newChildren = []
		childrenArray.slice(1).map((child, i) =>
			newChildren.push(
				<AnimatedFab style={getOtherButtonStyle(child, i)} {...prepareButtonProps(child, i)} fabButton key={i}>
					{child.props.children}
				</AnimatedFab>
			)
		)
		return newChildren
	}

	const renderFab = () => {
		const childrenArray = React.Children.toArray(props.children)
		remove(childrenArray, item => {
			if (item.type.displayName === "Styled(Button)") return true
			return null
		})
		return React.cloneElement(childrenArray[0], {
			style: {
				color: defaultThemeStyle.fabIconColor,
				fontSize: defaultThemeStyle.fabIconSize,
				lineHeight: itsIOS && 27,
				...childrenArray[0].props.style,
			},
		})
	}

	const { style } = props
	return (
		<Animated.View style={getContainerStyle()}>
			{renderButtons()}
			{itsIOS || defaultThemeStyle.androidRipple === false || Platform.Version <= 21 ? (
				<TouchableOpacity onPress={() => fabOnPress()} {...prepareFabProps()} activeOpacity={1}>
					{renderFab()}
				</TouchableOpacity>
			) : (
				<TouchableNativeFeedback
					onPress={() => fabOnPress()}
					// eslint-disable-next-line new-cap
					background={TouchableNativeFeedback.Ripple(defaultThemeStyle.androidRippleColor, false)}
					{...prepareFabProps()}>
					<View style={[fabStyle, style]}>{renderFab()}</View>
				</TouchableNativeFeedback>
			)}
		</Animated.View>
	)
}

module.exports = connectStyle(Fab, MODULE_NAME$)
