const MODULE_NAME$ = "elements/Fab"
console.debug(MODULE_NAME$)

const React = require("react")
const { Platform, Animated, TouchableOpacity, TouchableNativeFeedback, View, StyleSheet } = require("react-native")
const { remove, merge, clone } = require("lodash")

const { itsIOS } = require("/utils/device")
const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const { useThis } = require("/hooks")
const variables = require("/styles/themes/default")

const Button = require("./Button")

const DIRECTION = {
	DOWN: "down",
	LEFT: "left",
	RIGHT: "right",
	UP: "up",
}

const POSITION = {
	BOTTOM_LEFT: "bottomLeft",
	BOTTOM_RIGHT: "bottomRight",
	TOP_LEFT: "topLeft",
	TOP_RIGHT: "topRight",
}

const AnimatedFab = Animated.createAnimatedComponent(Button)

const Fab = props => {
	const _this = useThis()
	_this.containerHeight = new Animated.Value(variables.fabWidth)
	_this.containerWidth = new Animated.Value(0)
	_this.buttonScale = new Animated.Value(0)
	const [_buttons, set_buttons] = useState()
	const [_active, set_active] = useState(false)

	useEffect(() => {
		const childrenArray = React.Children.toArray(props.children)
		const icon = remove(childrenArray, item => {
			if (item.type.displayName === "Styled(Button)") {
				return true
			}
			return null
		})
		// eslint-disable-next-line react/no-did-mount-set-state
		set_buttons(icon.length)
		_this.activeTimer = setTimeout(() => {
			set_active(props.active)
		}, 0)
		return () => _this.activeTimer && clearTimeout(_this.activeTimer)
	}, [])

	const getOtherButtonStyle = (child, i) => {
		const { active, direction } = props
		const type = {
			top: direction ? fabOtherBtns(direction, i).top : undefined,
			left: direction ? fabOtherBtns(direction, i).left : 8,
			right: direction ? fabOtherBtns(direction, i).right : 0,
			bottom: direction ? fabOtherBtns(direction, i).bottom : active === false ? (itsIOS ? 8 : 8) : i * 50 + 50,
		}

		return merge(getInitialStyle().buttonStyle, StyleSheet.flatten(child.props.style), type)
	}

	const getContainerStyle = () => {
		return merge(getInitialStyle().container, props.containerStyle)
	}

	const getInitialStyle = iconStyle => {
		const { direction, position } = props
		return {
			fab: {
				height: variables.fabWidth,
				width: variables.fabWidth,
				borderRadius: variables.fabBorderRadius,
				elevation: variables.fabElevation,
				shadowColor: variables.fabShadowColor,
				shadowOffset: {
					width: variables.fabShadowOffsetWidth,
					height: variables.fabShadowOffsetHeight,
				},
				shadowOpacity: variables.fabShadowOpacity,
				justifyContent: "center",
				alignItems: "center",
				shadowRadius: variables.fabShadowRadius,
				position: "absolute",
				bottom: variables.fabBottom,
				backgroundColor: variables.fabBackgroundColor,
			},
			container: {
				position: "absolute",
				top: position ? fabTopValue(position).top : undefined,
				bottom: position ? fabTopValue(position).bottom : variables.fabContainerBottom,
				right: position ? fabTopValue(position).right : variables.fabContainerBottom,
				left: position ? fabTopValue(position).left : undefined,
				width: variables.fabWidth,
				height: _this.containerHeight,
				flexDirection: direction
					? direction === DIRECTION.LEFT || direction === DIRECTION.RIGHT
						? "row"
						: "column"
					: "column",
				alignItems: "center",
			},
			iconStyle: {
				color: variables.fabIconColor,
				fontSize: variables.fabIconSize,
				lineHeight: itsIOS ? 27 : undefined,
				...iconStyle,
			},
			buttonStyle: {
				position: "absolute",
				height: variables.fabButtonHeight,
				width: variables.fabButtonHeight,
				left: variables.fabButtonLeft,
				borderRadius: variables.fabButtonBorderRadius,
				transform: _active ? [{ scale: new Animated.Value(1) }] : [{ scale: _this.buttonScale }],
				marginBottom: variables.fabButtonMarginBottom,
				backgroundColor: variables.fabBackgroundColor,
			},
		}
	}

	const prepareButtonProps = child => {
		const inp = clone(child.props)
		delete inp.style

		const defaultProps = {}

		return computeProps(inp, defaultProps)
	}

	const fabTopValue = pos => {
		if (pos === POSITION.TOP_LEFT) {
			return {
				top: variables.fabDefaultPosition,
				bottom: undefined,
				left: variables.fabDefaultPosition,
				right: undefined,
			}
		} else if (pos === POSITION.BOTTOM_RIGHT) {
			return {
				top: undefined,
				bottom: variables.fabDefaultPosition,
				left: undefined,
				right: variables.fabDefaultPosition,
			}
		} else if (pos === POSITION.BOTTOM_LEFT) {
			return {
				top: undefined,
				bottom: variables.fabDefaultPosition,
				left: variables.fabDefaultPosition,
				right: undefined,
			}
		} else if (pos === POSITION.TOP_RIGHT) {
			return {
				top: variables.fabDefaultPosition,
				bottom: undefined,
				left: undefined,
				right: variables.fabDefaultPosition,
			}
		}
		return null
	}

	const fabOtherBtns = (direction, i) => {
		const { active } = props
		if (direction === DIRECTION.UP) {
			return {
				top: undefined,
				bottom: active === false ? (itsIOS ? 50 : 5) : i * 50 + 65,
				left: 8,
				right: 0,
			}
		} else if (direction === DIRECTION.LEFT) {
			return {
				top: 8,
				bottom: 0,
				left: active === false ? (itsIOS ? 8 : 8) : -(i * 50 + variables.fabWidth + 2),
				right: 0,
			}
		} else if (direction === DIRECTION.DOWN) {
			return {
				top: active === false ? (itsIOS ? 50 : 8) : i * 50 + 73,
				bottom: 0,
				left: 8,
				right: 0,
			}
		} else if (direction === DIRECTION.RIGHT) {
			return {
				top: 8,
				bottom: 0,
				left: active === false ? (itsIOS ? 50 : 8) : i * 50 + 73,
				right: 0,
			}
		}
		return null
	}

	const prepareFabProps = () => {
		const defaultProps = {
			style: getInitialStyle().fab,
		}
		const incomingProps = clone(props)
		delete incomingProps.onPress

		return computeProps(incomingProps, defaultProps)
	}

	const upAnimate = () => {
		if (!props.active) {
			Animated.spring(_this.containerHeight, {
				toValue: _buttons * 51.3 + variables.fabWidth,
			}).start()
			Animated.spring(_this.buttonScale, {
				toValue: 1,
				useNativeDriver: true,
			}).start()
		} else {
			set_active(false)
			Animated.spring(_this.containerHeight, {
				toValue: variables.fabWidth,
			}).start()
			Animated.spring(_this.buttonScale, {
				toValue: 0,
				useNativeDriver: true,
			}).start()
		}
	}

	const leftAnimate = () => {
		if (!props.active) {
			Animated.spring(_this.containerWidth, {
				toValue: _buttons * 51.3 + variables.fabWidth,
			}).start()
			Animated.spring(_this.buttonScale, {
				toValue: 1,
				useNativeDriver: true,
			}).start()
		} else {
			set_active(false)
			Animated.spring(_this.containerHeight, {
				toValue: variables.fabWidth,
			}).start()
			Animated.spring(_this.buttonScale, {
				toValue: 0,
				useNativeDriver: true,
			}).start()
		}
	}

	const rightAnimate = () => {
		if (!props.active) {
			Animated.spring(_this.containerWidth, {
				toValue: _buttons * 51.3 + variables.fabWidth,
			}).start()
			Animated.spring(_this.buttonScale, {
				toValue: 1,
				useNativeDriver: true,
			}).start()
		} else {
			set_active(false)
			Animated.spring(_this.containerHeight, {
				toValue: variables.fabWidth,
			}).start()
			Animated.spring(_this.buttonScale, {
				toValue: 0,
				useNativeDriver: true,
			}).start()
		}
	}

	const downAnimate = () => {
		if (!props.active) {
			Animated.spring(_this.containerHeight, {
				toValue: variables.fabWidth,
			}).start()
			Animated.spring(_this.buttonScale, {
				toValue: 1,
				useNativeDriver: true,
			}).start()
		} else {
			set_active(false)
			Animated.spring(_this.containerHeight, {
				toValue: variables.fabWidth,
			}).start()
			Animated.spring(_this.buttonScale, {
				toValue: 0,
				useNativeDriver: true,
			}).start()
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
			if (item.type.displayName === "Styled(Button)") {
				return true
			}
			return null
		})
		return React.cloneElement(childrenArray[0], {
			style: getInitialStyle(childrenArray[0].props.style).iconStyle,
		})
	}

	const { style } = props
	return (
		<Animated.View style={getContainerStyle()}>
			{renderButtons()}
			{itsIOS || variables.androidRipple === false || Platform.Version <= 21 ? (
				<TouchableOpacity onPress={() => fabOnPress()} {...prepareFabProps()} activeOpacity={1}>
					{renderFab()}
				</TouchableOpacity>
			) : (
				<TouchableNativeFeedback
					onPress={() => fabOnPress()}
					// eslint-disable-next-line new-cap
					background={TouchableNativeFeedback.Ripple(variables.androidRippleColor, false)}
					{...prepareFabProps()}>
					<View style={[getInitialStyle().fab, style]}>{renderFab()}</View>
				</TouchableNativeFeedback>
			)}
		</Animated.View>
	)
}

module.exports = connectStyle(Fab, MODULE_NAME$)
