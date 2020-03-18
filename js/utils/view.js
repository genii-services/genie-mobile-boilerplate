/** 공통 라이브러리
 * v1.0
 * v1.2 popup 인수에 따라 자동닫기 지연시간 조절
 */
const { Alert, ToastAndroid } = require("react-native")
const { Toast } = require("/elements")

const { OBJECT } = require("/constants")
const { BOTTOM, TOP } = require("/constants/style")
const { itsIOS } = require("./device")

function popup(text, title, buttons, duration = 3000, position = "bottom") {
	if (typeof text === OBJECT) {
		title = text.title
		buttons = text.buttons
		duration = text.duration || 3000
		position = text.position || BOTTOM
		text = text.text
	}
	if (buttons) {
		Alert.alert(title, text, buttons, { cancelable: true })
	} else if (itsIOS) {
		//alert(text, title)
		Toast.show({ text, position, buttonText: "OK", duration })
	} else {
		ToastAndroid.showWithGravity(
			text,
			3000 <= duration ? ToastAndroid.LONG : ToastAndroid.SHORT,
			position == BOTTOM ? ToastAndroid.BOTTOM : position == TOP ? ToastAndroid.TOP : ToastAndroid.CENTER
		)
	}
}

module.exports = {
	popup,
}
