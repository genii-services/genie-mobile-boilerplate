const MODULE_NAME$ = "ToastContainerElement"
console.debug(MODULE_NAME$)

/* eslint-disable class-methods-use-this */
const _ = require("lodash")
const React = require("react")
const { Keyboard, Animated } = require("react-native")

const { ABSOLUTE, BOTTOM, PC100, TOP } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const { createCoordinator, forwardRef, globalStore, useEffect, useState, useThis } = require("/hooks")

const Text = require("./Text")
const Button = require("./Button")
const Toast = require("./Toast")

const POSITION = {
	ABSOLUTE,
	BOTTOM,
	TOP,
}

globalStore.set("Toast", { type: "Toast" })

const ToastContainerElement = () => {
	console.debug(MODULE_NAME$, "called")
	const _this = useThis()
	const [_fadeAnim, set_fadeAnim] = useState(() => new Animated.Value(0))
	const [_keyboardHeight, set_keyboardHeight] = useState(0)
	const [_isKeyboardVisible, set_isKeyboardVisible] = useState(false)
	const [_modalVisible, set_modalVisible] = useState(false)
	const [_config, set_config] = useState()

	createCoordinator("Toast", () => ({
		showToast: (config) => {
			set_modalVisible(true)
			set_config(config)

			// If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
			if (_this.closeTimeoutHandle) clearTimeout(_this.closeTimeoutHandle)

			// Set the toast to close after the duration.
			if (config.duration !== 0) {
				const duration = config.duration > 0 ? config.duration : 1500
				_this.closeTimeoutHandle = setTimeout(() => _this.closeToast("timeout"), duration)
			}
			// Fade the toast in now.
			Animated.timing(_fadeAnim, { toValue: 1, duration: 200 }).start()
		},
		hide: (reason) => {
			if (!_modalVisible) return
			clearTimeout(_this.closeTimeout)
			Animated.timing(_fadeAnim, { toValue: 0, duration: 200 }).start(() => {
				set_modalVisible(false)
				typeof _this.onClose === "function" && _this.onClose(reason)
			})
		},
	}))

	useEffect(() => {
		const keyboardDidShow = (e) => {
			set_keyboardHeight(e.endCoordinates.height)
			set_isKeyboardVisible(true)
		}
		const keyboardDidHide = () => {
			set_keyboardHeight(0)
			set_isKeyboardVisible(false)
		}

		Keyboard.addListener("keyboardDidShow", keyboardDidShow)
		Keyboard.addListener("keyboardDidHide", keyboardDidHide)

		return () => {
			Keyboard.removeListener("keyboardDidShow", keyboardDidShow)
			Keyboard.removeListener("keyboardDidHide", keyboardDidHide)
		}
	}, [])

	const getToastStyle = () => {
		return {
			position: POSITION.ABSOLUTE,
			opacity: _fadeAnim,
			width: PC100,
			elevation: 9,
			paddingHorizontal: itsIOS ? 20 : 0,
			top: _config.position === POSITION.TOP && 30,
			bottom: _config.position !== POSITION.TOP && getTop(),
		}
	}

	const getTop = () => (itsIOS ? (_isKeyboardVisible ? _keyboardHeight : 30) : 0)

	const buttonText = _config ? _.trim(_config.buttonText) : ""
	return (
		_modalVisible && (
			<Animated.View style={getToastStyle()}>
				<Toast
					style={_config.style}
					danger={_type === "danger"}
					success={_config.type === "success"}
					warning={_config.type === "warning"}>
					<Text style={_config.textStyle}>{_config.text}</Text>
					{buttonText && (
						<Button style={_config.buttonStyle} onPress={() => closeToast("user")}>
							<Text style={_config.buttonTextStyle}>{buttonText}</Text>
						</Button>
					)}
				</Toast>
			</Animated.View>
		)
	)
}

if (__DEV__) {
	const { array, number, object, oneOfType, ViewPropTypes } = require("/utils/propTypes")
	ToastContainerElement.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
	}
}

const { connectStyle } = require("/utils/style")
module.exports = ToastContainerElement // connectStyle(ToastContainerElement, MODULE_NAME$)
