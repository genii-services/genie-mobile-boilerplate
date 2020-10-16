const MODULE_NAME$ = "AuthCoordinator"
console.debug(MODULE_NAME$)

require("react")

const { assign } = require("/utils")
const { Progress, SUCCEED, FAILED, ERROR } = require("/utils/progress")
const { useEffect, useRef, useState, useStore, useThis } = require("/hooks")
console.debug(MODULE_NAME$)
const notification = require("/interactors/notification")
const { request } = require("/interactors/rest")
const internalStorage = require("/interactors/internalStorage")
const { useRouter } = require("./router") // const router = require("/utils/router")

const initialState = require("/data/auth")

const useAuth = () => {
	console.debug(MODULE_NAME$, "called")

	const router = useRouter()

	const [value, setvalue] = useStore("value")

	const _this = useThis(initialState)
	const topRef = useRef()

	const [agreed, setAgreed] = useState(initialState.agreed)
	const [loginInfo, setLoginInfo] = useState(initialState.loginInfo)
	const [authToken, setAuthToken] = useState(initialState.authToken)
	const [userInfo, setUserInfo] = useState(initialState.userInfo)
	console.debug(this, "prepair to render", "+".repeat(40), authToken, agreed, setAgreed)

	const [currentScreen, setCurrentScreen] = useState(initialState.currentScreen)

	useEffect(() => {
		load()
		return () => internalStorage.save()
	}, [])

	const load = () => {
		internalStorage.load(MODULE_NAME$, (data) => {
			assign(initialState, data)
			const { loginInfo, userInfo } = initialState
			const currentScreen = router.getCurrentScreen()
			console.debug(this, "load", "~".repeat(40), authToken, agreed, setAgreed)
			if (!initialState.agreed) {
				loginInfo.emailAddress = ""
				loginInfo.password = ""
				if (currentScreen !== "intro") return router.reset("intro") // "permissions"
			}
			/*
			if (__DEV__ && currentScreen && currentScreen != 'intro') {
				// router.push(currentScreen)		// 연속으로 장면을 푸시하면 안됨
				return router.navigate(currentScreen)
			}*/
			if (userInfo) userInfo.touchedAt = Date.now()

			// router.push(!initialState.authToken ? "login" : "home")	// 사용권한 체크 후 실행하는 것으로 변경
		})
	}
	const save = () => {
		internalStorage.save(MODULE_NAME$, { agreed, setAgreed, authToken, loginInfo, userInfo, currentScreen })
	}

	const login = (paramz) => {
		const { pushToken } = notification.info
		progress.paramz = { ...paramz, pushToken }
		request("login", progress, ({ status, payload }) => {
			switch (status) {
				case SUCCEED: {
					if (!payload) return popup("로그인 정보가 내려오지 않았습니다.")
					// 로그인 정보 저장 (배포본은 암호 저장은 항상하지 않음)
					let { paramz } = progress
					setLoginInfo(
						paramz.loginInfoSavable
							? { ...paramz, password: "" }
							: { companyID: "HC00", loginInfoSavable: paramz.loginInfoSavable, password: "" }
					)
					// 사용자 정보 저장
					setUserInfo({ ...payload, touchedAt: Date.now() }) // Observer에서 빠른 처리를 위해서 null check를 생략하므로 undefined가 되면 안됨
					// 인증 토큰 설정
					setAuthToken(payload.authToken)
					// 내부저장소에 저장
					save()
					// 로그인되면 홈 화면으로 이동
					router.push("home")
					break
				}
			}
		})
	}

	const logout = () => {
		request("logout", progress, ({ status, payload }) => {
			switch (status) {
				case SUCCEED:
					popup("로그아웃되었습니다.")
				case FAILED:
				case ERROR: {
					setUserInfo({}) // 현재: 로그아웃이면 무조건 리셋, 이전: authToken이 없으면 로그아옷 상태로 판단, 이때 ID저장이 false이면 userInfo를 리셋함
					setAuthToken(undefined)
					setLoginInfo({ ...loginInfo, password: "" }) // 배포본은 암호 저장은 항상하지 않음
					save()
					// router.reset("login")
					router.reset("intro")
					router.push("login")
					break
				}
			}
		})
	}

	const setLoginInfoSavable = (bool) => {
		loginInfo.loginInfoSavable = bool
		loginInfo.emailAddress = bool ? userInfo.emailAddress : ""
		if (!__DEV__) loginInfo.password = "" // 배포본은 암호 저장은 항상하지 않음
		setLoginInfo(loginInfo)
		return bool
	}

	console.debug(this, "ready to render", "+".repeat(40), "end")
	return {
		loginInfo,
		authToken,
		userInfo,

		agreed,
		setAgreed,

		login,
		logout,
		setLoginInfoSavable,
		setCurrentScreen,
	}
}

module.exports = { useAuth }
console.debug(MODULE_NAME$)