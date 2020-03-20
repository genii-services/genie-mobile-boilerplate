const MODULE_NAME$ = "elements/ToastContainer"
console.debug(MODULE_NAME$)

/* eslint-disable class-methods-use-this */
const React = require("react")
const { Keyboard, Platform, Animated } = require("react-native")

const { connectStyle } = require("/utils/style")

const Text = require("./Text")
const Button = require("./Button")
const { Toast } = require("./Toast")

const { itsIOS } = require("/utils/device")

const POSITION = {
	ABSOLUTE: "absolute",
	BOTTOM: "bottom",
	TOP: "top",
}

const ToastContainer = props => {
	const keyboardDidHide = () => {
		set_keyboardHeight(0)
		set_isKeyboardVisible(false)
	}

	const keyboardDidShow = e => {
		set_keyboardHeight(e.endCoordinates.height)
		set_isKeyboardVisible(true)
	}

	const [_fadeAnim, set_fadeAnim] = useState(new Animated.Value(0))
	const [_keyboardHeight, set_keyboardHeight] = useState(0)
	const [_isKeyboardVisible, set_isKeyboardVisible] = useState(false)
	const [_modalVisible, set_modalVisible] = useState(false)

	useEffect(() => {
		Keyboard.addListener("keyboardDidShow", keyboardDidShow)
		Keyboard.addListener("keyboardDidHide", keyboardDidHide)
	}, [])

	const getToastStyle = () => {
		return {
			position: POSITION.ABSOLUTE,
			opacity: _fadeAnim,
			width: "100%",
			elevation: 9,
			paddingHorizontal: itsIOS ? 20 : 0,
			top: _position === POSITION.TOP && 30,
			bottom: _position === POSITION.BOTTOM && getTop(),
		}
	}

	const getTop = () => {
		if (itsIOS) return _isKeyboardVisible ? _keyboardHeight : 30
		return 0
	}

	const getButtonText = buttonText => buttonText && 0 < buttonText.trim() && buttonText

	const getModalState = () => _modalVisible

	const showToast = ({ config }) => {
		set_modalVisible(true)
		text: config.text
		buttonText: getButtonText(config.buttonText)
		type: config.type
		position: config.position ? config.position : POSITION.BOTTOM
		supportedOrientations: config.supportedOrientations
		style: config.style
		buttonTextStyle: config.buttonTextStyle
		buttonStyle: config.buttonStyle
		textStyle: config.textStyle
		_this.onClose = config.onClose

		// If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
		if (_this.closeTimeout) clearTimeout(_this.closeTimeout)

		// Set the toast to close after the duration.
		if (config.duration !== 0) {
			const duration = config.duration > 0 ? config.duration : 1500
			_this.closeTimeout = setTimeout(_this.closeToast.bind(this, "timeout"), duration)
		}
		// Fade the toast in now.
		Animated.timing(_fadeAnim, { toValue: 1, duration: 200 }).start()
	}
	const closeModal = reason => {
		set_modalVisible(false)
		typeof _this.onClose === "function" && _this.onClose(reason)
	}
	const closeToast = reason => {
		clearTimeout(_this.closeTimeout)
		Animated.timing(_fadeAnim, { toValue: 0, duration: 200 }).start(closeModal.bind(this, reason))
	}

	if (_modalVisible) {
		return (
			<Animated.View style={getToastStyle()}>
				<Toast style={_style} danger={_type === "danger"} success={_type === "success"} warning={_type === "warning"}>
					<Text style={_textStyle}>{_text}</Text>
					{_buttonText && (
						<Button style={_buttonStyle} onPress={() => closeToast("user")}>
							<Text style={_buttonTextStyle}>{_buttonText}</Text>
						</Button>
					)}
				</Toast>
			</Animated.View>
		)
	}
	return null
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType } = require("prop-types")
	ToastContainer.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
	}
}

// ToastContainer.toastInstance
ToastContainer.show = ({ ...config }) => {
	ToastContainer.toastInstance._root.showToast({ config })
}

ToastContainer.hide = () => {
	if (ToastContainer.toastInstance._root.getModalState()) {
		ToastContainer.toastInstance._root.closeToast("functionCall")
	}
}

module.exports = connectStyle(ToastContainer, MODULE_NAME$)
