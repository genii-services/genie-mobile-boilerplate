/** 공통 라이브러리 */
const MODULE_NAME$ = "interactors/notification.android"
console.debug(MODULE_NAME$, "load")

const messaging = require("@react-native-firebase/messaging").default

const { FUNCTION } = require("/constants")
const { trace } = require("/utils/debug")
const { deviceOS } = require("/utils/device")
const { popup } = require("/utils/view")

const notification = {
	platform: deviceOS,
	pushToken: undefined,
}

let tokenRefreshListener
let messageListener

notification.register = function() {
	// 클라우드 메시지를 보내고 받기 전에 사용자에게 올바른 권한이 부여되었는지 확인해야 합니다.
	console.debug("notification.android.register")
	messaging()
		.hasPermission()
		.then(enabled => {
			if (enabled) {
				// 권한을 가지고 있는 경우
				messaging()
					.getToken()
					.then(tcmToken => {
						notification.pushToken = tcmToken
						console.debug(MODULE_NAME$ + ".getToken", tcmToken)
					})
			} else {
				// 사용자가 아직 권한이 부여하지 않은 경우 권한을 달라는 메시지를 표시
				messaging()
					.requestPermission()
					.then(() => {
						// 사용자가 승인한 경우
						trace(MODULE_NAME$ + ".requestPermission", "granted")
						messaging()
							.getToken()
							.then(tcmToken => {
								notification.pushToken = tcmToken
								console.debug(MODULE_NAME$ + ".getToken", tcmToken)
							})
					})
					.catch(error => {
						// 사용자가 권한을 거부
						trace(MODULE_NAME$ + ".requestPermission", "rejected")
						popup("푸시 알림에 동의하지 않았으므로 알림을 받을 수 없습니다.")
					})
			}
		})

	// 토큰이 변경된 경우 처리
	tokenRefreshListener = messaging().onTokenRefresh(fcmToken => {
		console.debug(MODULE_NAME$ + ".onTokenRefresh", fcmToken)
		notification.pushToken = fcmToken
	})

	// 메시지가 온 경우 처리
	messageListener = messaging().onMessage(message => {
		console.debug(MODULE_NAME$ + ".onMessage", message)
		typeof notification.receiveNotification === FUNCTION &&
			notification.receiveNotification({ ...message, type: message.messageType, uniqueid: message.messageId })
	})

	return tokenRefreshListener
}

notification.unregister = function() {
	typeof tokenRefreshListener !== FUNCTION && tokenRefreshListener()
	typeof messageListener !== FUNCTION && messageListener()
}

messaging().setBackgroundMessageHandler(async message => {
	debugger
	console.debug(MODULE_NAME$ + ".backgroundMessageHandler", message)

	typeof notification.receiveNotification === FUNCTION &&
		notification.receiveNotification({ ...message, type: message.messageType, uniqueid: message.messageId })
})

/**
 * platform
 * pushToken
 * register
 * unregister
 * receiveNotification
 */
module.exports = notification
