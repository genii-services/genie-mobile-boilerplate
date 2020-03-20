const MODULE_NAME$ = "elements/ToastContainer"
console.debug(MODULE_NAME$)

/* eslint-disable class-methods-use-this */
const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { Keyboard, Platform, Animated, ViewPropTypes } = require("react-native")

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
	static toastInstance
	static show({ ...config }) {
		this.toastInstance._root.showToast({ config })
	}
	static hide() {
		if (this.toastInstance._root.getModalState()) {
			this.toastInstance._root.closeToast("functionCall")
		}
	}
	constructor(props) {
		super(props)

		this.state = {
			fadeAnim: new Animated.Value(0),
			keyboardHeight: 0,
			isKeyboardVisible: false,
			modalVisible: false,
		}

		this.keyboardDidHide = this.keyboardDidHide.bind(this)
		this.keyboardDidShow = this.keyboardDidShow.bind(this)
	}

	componentDidMount() {
		Keyboard.addListener("keyboardDidShow", this.keyboardDidShow)
		Keyboard.addListener("keyboardDidHide", this.keyboardDidHide)
	}

	getToastStyle() {
		return {
			position: POSITION.ABSOLUTE,
			opacity: _fadeAnim,
			width: "100%",
			elevation: 9,
			paddingHorizontal: itsIOS ? 20 : 0,
			top: _position === POSITION.TOP ? 30 : undefined,
			bottom: _position === POSITION.BOTTOM ? this.getTop() : undefined,
		}
	}

	getTop() {
		if (itsIOS) {
			if (_isKeyboardVisible) {
				return _keyboardHeight
			}
			return 30
		}
		return 0
	}

	getButtonText(buttonText) {
		if (buttonText) {
			if (buttonText.trim().length === 0) {
				return undefined
			}
			return buttonText
		}
		return undefined
	}
	getModalState() {
		return _modalVisible
	}

	keyboardDidHide() {
		this.setState({
			keyboardHeight: 0,
			isKeyboardVisible: false,
		})
	}

	keyboardDidShow(e) {
		this.setState({
			keyboardHeight: e.endCoordinates.height,
			isKeyboardVisible: true,
		})
	}

	showToast({ config }) {
		this.setState({
			modalVisible: true,
			text: config.text,
			buttonText: this.getButtonText(config.buttonText),
			type: config.type,
			position: config.position ? config.position : POSITION.BOTTOM,
			supportedOrientations: config.supportedOrientations,
			style: config.style,
			buttonTextStyle: config.buttonTextStyle,
			buttonStyle: config.buttonStyle,
			textStyle: config.textStyle,
			onClose: config.onClose,
		})
		// If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
		if (this.closeTimeout) {
			clearTimeout(this.closeTimeout)
		}
		// Set the toast to close after the duration.
		if (config.duration !== 0) {
			const duration = config.duration > 0 ? config.duration : 1500
			this.closeTimeout = setTimeout(this.closeToast.bind(this, "timeout"), duration)
		}
		// Fade the toast in now.
		Animated.timing(_fadeAnim, {
			toValue: 1,
			duration: 200,
		}).start()
	}
	closeModal(reason) {
		this.setState({
			modalVisible: false,
		})
		const { onClose } = this.state
		if (onClose && typeof onClose === "function") {
			onClose(reason)
		}
	}
	closeToast(reason) {
		clearTimeout(this.closeTimeout)
		Animated.timing(_fadeAnim, {
			toValue: 0,
			duration: 200,
		}).start(this.closeModal.bind(this, reason))
	}

	render() {
		if (_modalVisible) {
			return (
				<Animated.View style={this.getToastStyle()}>
					<Toast style={_style} danger={_type === "danger"} success={_type === "success"} warning={_type === "warning"}>
						<Text style={_textStyle}>{_text}</Text>
						{_buttonText && (
							<Button style={_buttonStyle} onPress={() => this.closeToast("user")}>
								<Text style={_buttonTextStyle}>{_buttonText}</Text>
							</Button>
						)}
					</Toast>
				</Animated.View>
			)
		}
		return null
	}
}

ToastContainer.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle(ToastContainer, MODULE_NAME$)
