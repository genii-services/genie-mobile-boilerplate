/** 공통 라이브러리 */
console.debug("utils/device")
const _ = require("lodash")
const { Dimensions, Platform } = require("react-native")
const DeviceInfo = require("react-native-device-info")
const Orientation = require("react-native-orientation-locker").default

const app = require("/../app.json")
const { ANDROID, IOS, WEB } = require("/constants")

/**
 * 디바이스 정보 (OS 정보 포함)
 */
const iosDeviceNamez = [
	{ name: "iPhone" },
	{ name: "iPhone 5" },
	{ name: "iPhone 6" },
	{ name: "iPhone 7" },
	{ name: "iPhone 8" },
	{ name: "iPhone S" },
]

function isNewIos(manufacturer) {
	let rtn = false
	if (/apple/i.test(manufacturer)) {
		for (let type of iosDeviceNamez) {
			if (type.name === DeviceInfo.getModel()) return true
		}
	}
	return rtn
}

const deviceID = DeviceInfo.getUniqueId()
const deviceType = DeviceInfo.getModel()
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window")
const deviceOS = Platform.OS
const osVersion = DeviceInfo.getSystemVersion() // 시스템 버전

const itsWeb = deviceOS === WEB
const itsAndroid = deviceOS === ANDROID
const itsIOS = deviceOS === IOS
const itsIPhoneXSize = deviceHeight === 812 || deviceWidth === 812
const itsIPhoneXrSize = deviceHeight === 896 || deviceWidth === 896
const itsIphoneX = itsIOS && (itsIPhoneXSize || itsIPhoneXrSize)
const itsNotch = itsIphoneX
const itsTablet = DeviceInfo.isTablet()
let itsNewIos
let manufacturer
DeviceInfo.getManufacturer().then(str => {
	// iOS: "Apple"
	// Android: "Google"
	// Windows: ?
	manufacturer = str
	// deviceOS = /apple/i.test(manufacturer) ? IOS : ANDROID // 장치 아이디
	itsNewIos = isNewIos(str)
})

const LANDSCAPE = "LANDSCAPE"
const LANDSCAPE_LEFT = "LANDSCAPE-LEFT"
const LANDSCAPE_RIGHT = "LANDSCAPE-RIGHT"
const PORTRAIT = "PORTRAIT"
const PORTRAIT_UPSIDEDOWN = "PORTRAITUPSIDEDOWN"
const screen = {
	isPortrait: () => _.startWith(screen.orientation, PORTRAIT),
}
const setScreenSize = orientation => {
	screen.orientation = orientation
	if (orientation == LANDSCAPE) {
		screen.max = screen.width = Math.max(deviceWidth, deviceHeight)
		screen.min = screen.height = Math.min(deviceWidth, deviceHeight)
	} else {
		screen.min = screen.width = Math.min(deviceWidth, deviceHeight)
		screen.max = screen.height = Math.max(deviceWidth, deviceHeight)
	}
}
const initialOrientation = Orientation.getInitialOrientation()
setScreenSize(initialOrientation)
Orientation.addOrientationListener(setScreenSize)

// let resizeFunc
// function orient(status = true, resizeCallback) {
// 	resizeFunc = resizeCallback
// 	if (status) {
// 		Orientation.getOrientation((err, orientation) => (deviceInfo.orientation = orientation))
// 		Orientation.addOrientationListener(setScreenSize)
// 	} else {
// 		Orientation.lockToPortrait()
// 		deviceInfo.orientation = "PORTRAIT"
// 		Orientation.removeOrientationListener(setScreenSize)
// 	}
// }
// function setScreenSize(orientation) {
// 	let screen = deviceInfo.screen
// 	if (orientation) screen.orientation = orientation
// 	else orientation = screen.orientation

// 	let { width, height } = Dimensions.get("window")
// 	if (DeviceInfo.itsTablet() && orientation === LANDSCAPE) {
// 		screen.max = screen.width = Math.max(width, height)
// 		screen.min = screen.height = Math.min(width, height)
// 	} else {
// 		screen.min = screen.width = Math.min(width, height)
// 		screen.max = screen.height = Math.max(width, height)
// 	}
// 	if (resizeFunc) resizeFunc(orientation)
// 	console.debug("setScreenSize", width, height, resizeFunc)
// }

/**
 * 앱 정보
 */
const appID = app.name // 배포 파일명으로써 배포서버와의 버전 비교시에 사용, 모든 API호출시에도 사용
const bundleID = DeviceInfo.getBundleId()
const appVersion = DeviceInfo.getVersion()
const buildNumber = app.buildNumber || DeviceInfo.getBuildNumber() % 1048576

module.exports = {
	LANDSCAPE,
	LANDSCAPE_LEFT,
	LANDSCAPE_RIGHT,
	PORTRAIT,
	PORTRAIT_UPSIDEDOWN,

	appID,
	appVersion,
	bundleID,
	buildNumber,
	deviceID,
	deviceOS,
	deviceType,
	deviceWidth,
	deviceHeight,
	initialOrientation,
	itsAndroid,
	itsIOS,
	itsIphoneX,
	itsNewIos,
	itsNotch,
	itsTablet,
	manufacturer,
	osVersion,
	screen,
	// orient
}
