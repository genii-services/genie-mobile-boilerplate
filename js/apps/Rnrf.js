console.debug(Rnrf)

const React = require("react")
const { useEffect, useState } = React
const { AppState, Linking, View } = require("react-native")
const { PERMISSIONS } = require("react-native-permissions")
// const Orientation = require("react-native-orientation-locker").default

const { whoami, trace } = require("/utils/debug")
const { SUCCEED } = require("/utils/progress")
const { checkAppVersion, exitApp } = require("/utils/app")
const { deviceOS, itsAndroid } = require("/utils/device")
const { useRefs, useThis } = require("/hooks")
const permissions = require("/interactors/permissions")
const notification = require("/interactors/notification")
const restSvc = require("/interactors/rest")
// const router = require("/utils/router")
const { useAuth, useRouter } = require("/coordinators")
const { Actions, Drawer, Lightbox, Modal, Overlay, Reducer, Router, Screen, Stack } = require("/coordinators/router")

const { MainDrawer } = require("/drawers")
const {
	Permissions,
	Intro,
	Login,
	Home,
	// Settings,
	// ItemList,
	// ItemDetail,
	// CommentList,
	// UserSearch,
	// UserDetail,
	// ImageViewer,
	// HtmlViewer,
} = require("/screens")

const config = require("/data/config")
const { Root } = require("/elements")

const navigator = Actions.create(
	<Overlay>
		<Modal key="modal" hideNavBar>
			<Drawer key="drawer" contentComponent={MainDrawer} gestureEnabled={true} panHandlers={null}>
				<Stack key="stack" hideNavBar gestureEnabled={false} panHandlers={null}>
					<Screen key="intro" component={Intro} drawer={false} gestureEnabled={false} panHandlers={null} initial />
					<Screen key="permissions" component={Permissions} path="/permissions/" />
					<Screen key="login" component={Login} path="/login/" drawer={false} gestureEnabled={false} panHandlers={null} />
					<Screen key="home" component={Home} path="/home/" drawer={true} />
					{/*

					<Screen key="userSearch" component={UserSearch} path={"/user/"} />
					<Screen key="userDetail" component={UserDetail} />

					<Screen key="board" component={ItemList} path={"/board/:id/"} />
					<Screen key="article" component={ItemDetail} />
					<Screen key="comments" component={CommentList} />

					<Screen key="settings" component={Settings} path="/settings/" />

					<Screen key="viewImages" component={ImageViewer} />
					<Screen key="viewHtml" component={HtmlViewer} />*/}
				</Stack>
			</Drawer>
		</Modal>
	</Overlay>
)

const androidPermissions = [
	// PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
	"android.permission.WRITE_EXTERNAL_STORAGE",
]
const iosPermissions = []

const Rnrf = (props) => {
	const { authToken, setAgreed, agreed } = useAuth()
	console.debug(this, "render", "+".repeat(80), authToken, agreed, setAgreed)
	const router = useRouter()

	const _this = useThis()
	const refs = useRefs()
	const [_appState, set_appState] = useState(AppState.currentState)

	if (!refs.top) {
		// 초기화되었을 때
		// Orientation.lockToPortrait()
	}

	const handleAppStateChange = (appState) => {
		if (_appState.match(/inactive|background/) && appState === "active") {
			console.debug(Rnrf, "has come to the foreground!")
			// checkAuth()
		}
		set_appState(appState)
	}

	const handleOpenURL = (event) => {
		console.debug(Rnrf, event.url)
	}

	useEffect(() => {
		const a = getCallerName()
		// 마운트 되었을 때
		// console.debug(Rnrf, 'mounted')
		Linking.addEventListener("url", handleOpenURL)
		AppState.addEventListener("change", handleAppStateChange)
		notification.register()

		setTimeout(
			() =>
				permissions.check(
					itsAndroid ? androidPermissions : iosPermissions, //
					(unassentedPermissions) => {
						permissions.request(unassentedPermissions, (results) => {
							if (results && results.length) {
								// router.reset('intro')
								return popup("필수 권한 사용에 동의하지 않으면 앱을 사용할 수 없습니다. 앱 종료 재시작해 주세요.")
							}
							setAgreed(true)

							/*
							// 앱 버전 검사
							// if (!__DEV__) {
							restSvc.checkAppVersion({ deviceOS }, ({ status, payload }) => {
								if (status === SUCCEED) {
									// console.debug(this, "payload=", payload)
									checkAppVersion(payload.aPP_VERSION)
								}
							})
							// }
							*/
							router.push(!authToken ? "login" : "home")
						})
					}
				),
			500 // 인트로 화면 프랜지션 완료 후 체크하기 위한 딜레이
		)

		return () => {
			// 언마운트 되었을 때
			// console.debug(Rnrf, 'will unmount')
			// stop listening for events
			notification.unregister()
			AppState.removeEventListener("change", handleAppStateChange)
			Linking.removeEventListener("url", handleOpenURL)
		}
	}, [])

	_this.backCount = 0
	const handleBackAndroid = () => {
		// onMainScreen and goBack are just examples, you need to use your own implementation here
		// Typically you would use the navigator here to go to the last state.
		router.closeDrawer()
		switch (router.getCurrentScreen()) {
			case "intro":
			case "login": {
				exitApp()
				return false // 바로 나감
			}
			case "home": {
				// 홈이면 종료 확인
				/*
				if(_this.backCount == 0) {
					backCount++
					popup('한번 더 뒤로가기 버튼을 누르면 종료됩니다.')
					return true
				}*/
				popup(`앱을 종료하시겠습니까?`, "종료 확인", [{ text: "종료", onPress: exitApp }])
				break
			}
			case "itemDetail": {
				_this.backCount = 0
				if (router.getPrevScreen() === "listArticle") router.pop({ refresh: { refreshedTimestamp: Date.now() } })
				else router.pop()
				break
			}
			default: {
				_this.backCount = 0
				router.pop()
			}
		}
		return true
	}

	const handleOnEnterScreen = (props) => {
		const whoami$ = whoami(props.routeName, "onEnter", "1;92")
		const { authToken, currentScreen, setCurrentScreen } = useAuth()

		if (!props || !props.routeName) {
			// Actions.jump로 이동한 경우 props = {}
			// static이므로 this = globalThis
			return trace(whoami$, props, "previous screen is ", currentScreen)
		}
		try {
			console.debug(whoami$, props)
			let curScreen = Actions.currentScene

			if (currentScreen != curScreen) {
				setCurrentScreen(curScreen)
			}

			if (!config) return false // config가 undefined인 경우 아직 초기화 중이므로 rendering하지 않음
			if (!authToken) {
				if (curScreen !== "login") push("login")
				return true // 로그인 정보가 없으면서 로그인 화면에 와 있는 경우는 true
			}
			if (curScreen === "login") {
				// AuthToken이 있으면서 로그인 장면인 경우 메인 장면으로 이동
				console.debug(whoami$, "if(getCurrentScreen() == 'login') push('home')")
				push("home")
				return false
			}

			if (curScreen === "home") {
				if (boardz.getBoard("Announcementsoneaday").paramz.searchKeyword)
					boardz.reload("Announcementsoneaday", { searchKeyword: "" })
				if (boardz.getBoard("FamilyEvent").paramz.searchKeyword) boardz.reload("FamilyEvent", { searchKeyword: "" })
			}
			/*
			if(currentScreen === 'intro') {	// 이전 앱 장면이 인트로이면 홈으로
				console.debug(whoami$, "if(curScreen == 'intro') push('home')")
				push("home")
				return false
			}
			*/
			return true
		} catch (e) {
			console.warn(whoami$, e.toString())
		}
	}

	return (
		<Root>
			<Router navigator={navigator} backAndroidHandler={handleBackAndroid} enterHandler={handleOnEnterScreen} />
		</Root>
	)
}

const { gestureHandlerRootHOC } = require("react-native-gesture-handler") // Android에서 react-navigation-drawer의 Edge Swipe를 활성화하는 코드
module.exports = gestureHandlerRootHOC(Rnrf)
