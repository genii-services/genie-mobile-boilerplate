/** 공통 라이브러리 */
const MODULE_NAME$ = "interactors/notification.ios"
console.debug(MODULE_NAME$, "load")

const PushNotificationIOS = require("@react-native-community/push-notification-ios")
// const { requestNotifications } = require("react-native-permissions")

const { deviceOS } = require("/utils/device")

const notification = {
	platform: deviceOS,
	pushToken: undefined,
}

/*
requestNotifications(["alert", "sound"]).then(({ status, settings }) => {
	console.debug("requestNotifications", status, settings)
})
*/

function handleIOSRegister(token) {
	console.debug(MODULE_NAME$ + ".register", "You are registered and the device token is: ", token)
	//alert(`Push Token is ${token}`)
	notification.pushToken = token
}

function handleIOSRegistrationError(error) {
	console.debug(MODULE_NAME$ + ".registrationError", error)
}

function handleIOSNotification(noti) {
	console.debug(MODULE_NAME$ + ".notification", "You have received a new notification!", noti)
	/*
	const result = `Message: ${noti.getMessage()};\n
	badge: ${noti.getBadgeCount()};\n
	sound: ${noti.getSound()};\n
	category: ${noti.getCategory()};\n
	content-available: ${noti.getContentAvailable()}.`;
	*/
	typeof notification.receiveNotification === FUNCTION && notification.receiveNotification(noti._data)
}

function handleIOSLocalNotification(noti) {
	console.debug(MODULE_NAME$ + ".localNotification", "You have received a new notification!", noti, noti.getMessage())
}

notification.register = function(options = ["alert", "badge", "sound"]) {
	console.debug("notification.ios.register", options.join(","))

	PushNotificationIOS.requestPermissions(
		options,
		() => console.debug(MODULE_NAME$ + ".requestPermissions", "accepts"),
		() => console.debug(MODULE_NAME$ + ".requestPermissions", "rejects")
	)
	PushNotificationIOS.addEventListener("register", handleIOSRegister)
	PushNotificationIOS.addEventListener("registrationError", handleIOSRegistrationError)
	PushNotificationIOS.addEventListener("notification", handleIOSNotification)
	PushNotificationIOS.addEventListener("localNotification", handleIOSLocalNotification)
}

notification.unregister = function() {
	console.debug("notification.ios.unregister")
	PushNotificationIOS.removeEventListener("register", handleIOSRegister)
	PushNotificationIOS.removeEventListener("registrationError", handleIOSRegistrationError)
	PushNotificationIOS.removeEventListener("notification", handleIOSNotification)
	PushNotificationIOS.removeEventListener("localNotification", handleIOSNotification)
}

/**
 * platform
 * pushToken
 * register
 * unregister
 * receiveNotification
 */
module.exports = notification
