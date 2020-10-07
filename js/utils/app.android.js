/** 앱 관련 라이브러리
 * 191206 소스 분리
 */

const {
	Alert,
	Linking: { openURL },
} = require("react-native")
const _ = require("lodash")
const { goToDownload } = require("react-native-android-auto-update")
const IntentLauncher = require("react-native-android-intent-launcher")
const { IntentConstant } = IntentLauncher

const { urlz } = require("/data/config")
const { deleteSimilarFiles } = require("./fs")
const { whoami } = require("./debug")
const { browse } = require("./router")
const { applicationName } = require("/../app.json")

const DOWNLOAD = "download"

function installApp(
	options = {
		ver: "", // next
		similarFilesDeletable: true,
		downloadType: undefined, // undefined: 직접 다운로드 후 설치, download: 다운로드 만, 'web': 다운로드 웹페이지 표시
	}
) {
	console.debug("app.installApp", options)
	Alert.alert("앱 다운로드 중", "다운로드 중입니다. 잠시만 기다려주세요.", [{}], { cancelable: false })

	if (options.similarFilesDeletable) {
		// 이전에 다운로드한 앱 파일을 삭제
		try {
			deleteSimilarFiles(`${applicationName}.*\.apk`)
		} catch (e) {
			console.warn(whoami(this, e.toString()))
		}
	}

	const { ver = "" } = options
	switch (options.downloadType) {
		case "web":
			openURL(`${urlz.download}/${ver || DOWNLOAD}`) // 다운로드 웹페이지를 띄울 경우
			break
		case "download":
			openURL(`${urlz.download}/${ver || DOWNLOAD}#hanilgw_apk`) // 다운로드 웹페이지에서 바로 다운로드할 경우
			break
		default:
			// 바로 다운로드하고 설치
			const downloadUrl = `${urlz.download}/${ver}${applicationName}.apk`
			goToDownload(
				downloadUrl,
				(progress) => console.debug(progress),
				(err) => alert(err)
			)
	}
}

/*	이전 방식: targetSdkVersion = 28 이상인 경우 신형 안로이드에서 정상 작동하지 않음

function installApp(options) {
	Alert.alert('앱 다운로드 중', '다운로드 중입니다. 잠시만 기다려주세요.', [{}], {cancelable:false})
	try {
		deleteSimilarFiles(applicationName + ".*\.apk")
	} catch (e) {
		console.warn(whoami(this, e.toString()))
	}
	let ver = options?.ver || ""
	FetchBlob.config({
		addAndroidDownloads: {
			useDownloadManager: true,
			title: `${applicationName}.apk`,
			description: "업데이트된 앱을 설치합니다.",
			path: `${fs.dirs.DownloadDir}/${applicationName}.apk`,
			mime: "application/vnd.android.package-archive",
			mediaScannable: true,
			notification: true,
		},
	})
		.fetch("GET", downloadUrl)
		.then(res => {
			// popup(`앱을 다운로드하였습니다.\n설치를 진행합니다.`)
			Alert.alert(
				"앱 업데이트",
				`앱 다운로드가 완료되었습니다.\n확인 버튼을 누르시면 설치가 진행됩니다.\n\n설치 진행이 안될 경우 'WEB설치' 버튼을 누르시어 다운로드 사이트를 통한 설치 진행해 주세요.`,
				[
					{
						text: "WEB설치",
						onPress: () => openURL(`${urlz.download}/${ver || DOWNLOAD}`),
					}, // 다운로드 웹페이지를 띄울 경우
					{ text: "확인", onPress: () => installAppStep2(res) },
				],
				{ cancelable: false }
			)
			console.debug(this, res.path(), buildNumber)
			if (48 === buildNumber) {
				showInfo() // 48버전 전용
			} else {
				android.actionViewIntent(res.path(), "application/vnd.android.package-archive")
				setTimeout(() => exitApp(), 0) // 안하면 설치 취소시 앱이 실행 상태
			}
		})
		.catch(e => {
			// popup(`업데이트에 실패하였습니다.\n잠시후 다시 시도해 주십시요.`)
			console.warn(whoami(this, arguments), e.message)
			showInfo()
		})
}

function installAppStep2(option) {
	console.debug("app.installAppStep2", option)
	android.actionViewIntent(option.path(), "application/vnd.android.package-archive")
	exitApp()
	setTimeout(() => exitApp(), 0) // 굳이 종료할 필요없으나, 이전 버전의 사용을 제한하기 위해 필요하고 웹브라우저가 열리기 전에 빨리 종료하면 아무것도 열리지 않기 때문에 시간지연하여 실행
}

function showInfo() {
	// router.push("viewHtml", { title: "업그레이드 안내", source: { uri: "https://facebook.github.io/react-native/" }, button: "종료" })
	browse("https://mobile.hanil.com/mobileApp/info")
	setTimeout(exitApp, 3000)
}
*/

function startActivity(appName, category) {
	try {
		IntentLauncher.startActivity({
			action: IntentConstant.ACTION_MAIN,
			category,
		})
	} catch (e) {
		popup(`${appName}이(가) 지정되어 있지 않거나 설치되어 있지 않습니다.`)
	}
}

function openApp(appName, package, downloadURL, options) {
	IntentLauncher.isAppInstalled(package).then((isInstalled) => {
		if (isInstalled) IntentLauncher.openApp(package, options)
		else if (downloadURL) {
			popup(`${appName}이(가) 설치되어 있지 않습니다.`)
			browse(downloadURL)
		}
	})
}

module.exports = {
	installApp,
	startActivity,
	openApp,
}
