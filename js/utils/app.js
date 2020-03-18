/** 앱 관련 라이브러리
 * 200311 launchApp 추가
 * 191206 소스 분리
 */

const {
	Alert,
	Linking: { canOpenURL, openURL },
} = require("react-native")
const _ = require("lodash")
const { exitApp } = require("react-native-exit-app")

const { OBJECT, STRING } = require("/constants")
const { urlz } = require("/data/config")
const { checkingAppNames, callingAppInfoz } = require("/data/appInfo")

const { popup } = require("./view")
const { browse } = require("./router")
const { displayName } = require("/../app.json")

const DOWNLOAD = "download"

const app = itsAndroid
	? require("/utils/notification.android")
	: itsIOS
	? require("/utils/notification.ios")
	: { register: () => {}, unregister: () => {} }

/**
 * 앱 버전을 검사하여 현재 설치되어 있는 버전이 낮으면 업그레이드
 *
 * @param {String} ver2 버전 문자열 예: 1.0.34
 * @returns
 */
function checkAppVersion(ver2) {
	if (typeof ver2 !== STRING) return popup("서버 앱 버전이 이상합니다.")
	let ver1
	let ver2s = ver2.split(".")
	if (1 < ver2s.length) {
		// 버전과 빌드번호로 비교. 예: 1.0.34
		ver2 = _.map(ver2s, s => _.padStart(s, 6, "0")).join("")
		ver1 = `${appVersion}.${buildNumber}`
		if (typeof ver1 !== STRING) return popup("앱 버전이 이상합니다.")
		ver1 = _.map(ver1.split("."), s => _.padStart(s, 6, "0")).join("")
		//ver1 = ver1.split('.').map(s => s.padStart(6, '0')).join('')			//react-native 51 release에서 s.padStart가 작동하지 않음
		console.debug(this, "Installable Version", ver2, "appVersion", ver1, ver1 < ver2)
	} else {
		// 빌드번호로 비교. 예: 34
		ver1 = buildNumber
		console.debug(this, "Installable Version", ver2, "buildNumber", ver1, ver1 < ver2)
	}
	if (ver1 < ver2) upgradeApp({ cancelable: false })
}

/**
 * 앱을 업그레이드
 *
 * @param {object} [options={}]
 */
function upgradeApp(options = {}) {
	let buttons = [] //
	if (options.cancelable) {
		buttons.push({ text: "취소", style: "cancel" })
	}
	let ver = (options && options.ver) || ""
	buttons.push(
		{
			text: "WEB설치",
			onPress: () => openURL(`${urlz.download}/${ver || DOWNLOAD}`),
		}, // 다운로드 웹페이지를 띄울 경우
		{ text: "확인", onPress: () => app.installApp(options) } // 앱을 직접 다운로드하여 설치
	)
	let message = options.message
		? options.message
		: options.ver == "/next"
		? `개발 중인 최신 버전을 설치하시겠습니까?\n주의! 테스트 중이므로 버그가 있을 수 있습니다.`
		: `${displayName}를 설치합니다.\n확인 버튼을 누르시면 다운로드가 진행됩니다.\n\n설치 진행이 안될 경우 'WEB설치' 버튼을\n누르시어 다운로드 사이트를 통한 설치 진행해 주세요.`
	Alert.alert("앱 업데이트 안내", message, buttons, options)
}

function checkAppsInstalled(appNames) {
	if (!appNames) appNames = checkingAppNames

	let notExists = [],
		i = 0,
		ii = appNames.length
	function resultCheckApp(supported, title) {
		if (!supported) notExists.push(title)
		i++
		console.debug(title, supported)
		if (i >= ii && notExists.length) {
			popup(`${_.join(notExists, ", ")} 앱이\n설치되어 있지 않습니다.`, "업무에 필요한 앱이 없습니다.", [
				{ text: "취소", style: "cancel" },
				{
					text: "설치",
					onPress: () => openURL(urlz.downloadApp),
				},
			])
		}
	}
	_.forEach(appNames, v => {
		//
		let appInfo = callingAppInfoz[v]
		if (!appInfo) return
		let url = appInfo[Platform.OS]
		// console.debug(checkingAppNames.title, url)
		canOpenURL(url)
			.then(supported => resultCheckApp(supported, appInfo.title))
			.catch(err => resultCheckApp(false, appInfo.title))
	})
}

const launchApp = (appPath, appName, options) => {
	// let nativeModules = require('NativeModules')
	console.debug("launchApp", appPath)
	let appInfo = callingAppInfoz[appPath]
	let downloadURL = options && options.downloadURL
	if (appInfo) {
		if (!appName) appName = appInfo.title
		if (appInfo.downloadURL) downloadURL = appInfo.downloadURL
		appInfo = appInfo[Platform.OS] || appPath
		if (typeof appInfo === OBJECT) {
			switch (appInfo.type) {
				case "category":
					return app.startActivity(appName, appInfo.category)
				case "package": {
					return app.openApp(appInfo.package, downloadURL, options)
				}
			}
		}
	}

	let url = appInfo || appPath
	let message = `${appName || appPath}을(를) 수행할 수 없습니다. 단말기 설정을 확인하세요.`
	let title = `${appName || "앱"} 실행`
	canOpenURL(url)
		.then(supported => {
			if (!supported) {
				console.warn(`Can't handle url: ${url}`)
				if (downloadURL) browse(downloadURL)
				else popup(message, title)
				return
			}
			return openURL(url)
		})
		.catch(err => {
			console.warn("An error occurred", err)
			if (downloadURL) browse(downloadURL)
			else popup(message, title)
		})
}

exports = module.exports = app
exports.upgradeApp = upgradeApp
exports.checkAppVersion = checkAppVersion
exports.checkAppsInstalled = checkAppsInstalled
exports.exitApp = exitApp
exports.launchApp = launchApp
