/** 공통 라이브러리 */
const MODULE_NAME$ = "interactors/exceptionHandler"
console.debug(MODULE_NAME$)

const { Alert } = require("react-native")
const { getJSExceptionHandler, setNativeExceptionHandler, setJSExceptionHandler } = require("react-native-exception-handler")
const RNRestart = require("react-native-restart")

require("/utils/debug")

const { yyyymmddhhmmss } = require("/utils/moment")
const { exitApp } = require("/utils/app")
const fs = require("/utils/fs")
const { useAuth } = require("/coordinators")

// @todo remove when RN upstream is fixed

if (console.disableYellowBox) console.disableYellowBox = true
//console.ignoredYellowBox = ['Warning: Failed propType: SceneView']

if (!__DEV__) {
	const saveException = (exception) => {
		try {
			debugger
			const { auth } = useAuth()
			console.error(">>>>> exception", exception.detail.message) // Android의 경우 ADB 로그에서 확인할 수 있습니다.
			console.error(">>>>> exception", exception)

			let paramz = {
				timeStamp: yyyymmddhhmmss(),
				errorLog: JSON.stringify(exception),
				user: auth.user,
			}

			//console.error("@@@@@ paramz", paramz)
			// auth.sendExceptionInfo(paramz, state => exitApp())
			fs.writeFile(fs.prepairFilePath(fs.documentPath, "exceptions", paramz.timeStamp + ".json"))
				.then(() => exitApp())
				.catch((err) => exitApp())
		} catch (e) {
			console.error(e)
			exitApp()
		}
	}

	const defaultMessage = "오류 정보를 파일에 저장하고 종료합니다." //"오류 정보를 서버로 전송하고 종료합니다."

	const exceptionHandler = ({ name = "예외상황 발생", message = defaultMessage, isFatal }) => {
		// if (!isFatal) return saveException(exception)
		Alert.alert(name, message, [
			// { text: "종료", onPress: () => saveException(exception) }
			{ text: "재시작", onPress: () => RNRestart.Restart() },
		])
	}

	/*
		사용자 지정 전역 에러핸들러
		충돌을 추적하기 위해 Google 애널리틱스 또는 서버에 알리기 위해 사용자 정의 API 호출
		네이티브 오류가 발생하면 JS를 통한 경고 또는 UI 변경 사항 표시는 작동하지 않음
	*/
	setNativeExceptionHandler((message) => exceptionHandler({ type: "NativeException", name: "네이티브 에러", message }))

	// const currentHandler = getJSExceptionHandler()	// getJSExceptionHandler gives the currently set JS exception handler
	//setJSExceptionHandler((exception, isFatal) => exceptionHandler({ type: "JSException", detail: exception, isFatal }), false)
	setJSExceptionHandler(
		(exception, isFatal) =>
			exceptionHandler({ type: "JSException", name: exception.name, message: exception.message, exception, isFatal }),
		false
	)
}
