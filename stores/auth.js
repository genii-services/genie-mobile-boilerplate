const _ = require("lodash")
const { observable, action } = require("mobx")
const { create, persist } = require("mobx-persist")
const AsyncStorage = require("@react-native-community/async-storage").default

const { OBJECT, LIST } = require("/constants")
const { Progress, SUCCEED, FAILED, ERROR } = require("/utils/progress")
const config = require("/data/config")
const { popup } = require("/utils/view")
const { assign } = require("/utils")
const { yyyymmddhhmmss } = require("/utils/moment")
const router = require("/services/router")
const notification = require("/services/notification")
const { request } = require("/services/rest")
const { setFontSizes } = require("/styles")

const NAME$ = "authStore"
console.debug(NAME$, "(re)loaded")

const domainNames = config.runningMode !== 99 ? ["hanildev.com", "partner.hanildev.com"] : ["hanil.com", "partner.hanil.com"]

const initialState = !__DEV__
	? {
			authToken: "",
			userInfo: {},
			workInfo: {},
			workInfos: [],
			loginInfo: {
				companyID: "HC00",
				emailAddress: "jshin@hanildev.com",
				empID: "GW_TEST_02",
				password: "199801001",
				loginInfoSavable: true,
				userID: "HC00.199801001",
				deptID: "HC00.00520",
				rootDeptID: "HC00.00000",
			},
			domainNames: ["hanildev.com", "partner.hanildev.com"],
			currentScreen: undefined,
			fontSizesIndex: 2,
			domainNames,
	  }
	: {
			authToken: undefined,
			userInfo: {},
			workInfo: {},
			workInfos: [],
			loginInfo: {
				companyID: "HC00",
				emailAddress: "",
				empID: "",
				password: "",
				loginInfoSavable: true,
				userID: "",
				deptID: "",
				rootDeptID: "",
			},
			// domainNames: ["hanildev.com", "partner.hanildev.com", "hanil.com", "partner.hanil.com"],
			domainNames: ["hanil.com", "partner.hanil.com"],
			currentScreen: undefined,
			fontSizesIndex: 2,
			domainNames,
	  }

class AuthStore extends Progress {
	@observable agreed
	@persist @observable authToken = initialState.authToken
	@persist(OBJECT) @observable loginInfo = initialState.loginInfo
	@persist(OBJECT) @observable userInfo = initialState.userInfo
	@persist(OBJECT) @observable workInfo = initialState.workInfo
	@persist(LIST) @observable workInfos = initialState.workInfos
	@persist @observable currentScreen = initialState.currentScreen

	domainNames = initialState.domainNames
	@persist @observable fontSizesIndex = initialState.fontSizesIndex

	paramz = {}

	constructor(props) {
		super(props)
	}

	@action setLoginInfoSavable(bool) {
		let { loginInfo } = this
		loginInfo.loginInfoSavable = bool
		loginInfo.emailAddress = bool ? this.userInfo.emailAddress : ""
		if (!__DEV__) loginInfo.password = "" // 배포본은 암호 저장은 항상하지 않음
		return bool
	}

	@action setDrmUsable(name) {
		// null이면 사용안함
		this.loginInfo.drmUsable = !name ? false : true
		// console.debug('\n'+'setDrmUsable='+ name, this.loginInfo.drmUsable)
	}

	@action setCurrentScreen(name) {
		this.currentScreen = name
	}

	@action login(paramz) {
		let { platform, pushToken } = notification.info
		console.debug(this, platform, pushToken)
		assign(progress.paramz, paramz, { pushToken })
		request("login", progress, handleOnLogin)
	}

	@action.bound handleOnLogin({ status, payload, /* paramz, 서버에 요청한 파라메터 */ progress }) {
		switch (status) {
			case SUCCEED: {
				if (!payload) return popup("로그인 정보가 내려오지 않았습니다.")

				// 로그인 정보 저장
				// Observer에서 빠른 처리를 위해서 null check를 생략하므로 undefined가 되면 안됨
				// console.debug('\n'+'setLoginInfo before', this.loginInfo)
				let { paramz } = progress
				this.loginInfo = paramz.loginInfoSavable
					? { ...paramz }
					: { companyID: "HC00", loginInfoSavable: paramz.loginInfoSavable }
				this.loginInfo.password = "" // 배포본은 암호 저장은 항상하지 않음
				// console.debug('\n'+'setLoginInfo', this.loginInfo)

				// 사용자 정보 저장
				let { userInfo } = payload
				this.userInfo = { ...userInfo, touchedAt: yyyymmddhhmmss() } // Observer에서 빠른 처리를 위해서 null check를 생략하므로 undefined가 되면 안됨

				// 인증 토큰 설정
				this.authToken = payload.authToken

				// 겸직 정보를 사용할 수 있도록 준비
				let { additionalJobList } = userInfo
				let workInfos = []
				if (additionalJobList instanceof Array && 0 < additionalJobList.length) {
					_.forEach(additionalJobList, v => {
						let { workInfo } = v
						workInfo.displayName = `${workInfo.deptName}/${workInfo.parentDeptName}/${workInfo.companyName}`
						workInfos.push(workInfo)
					})
					this.workInfos = workInfos
					this.workInfo = workInfos[0]
				} else {
					this.workInfo = payload.userInfo
					workInfos.push(this.workInfo)
				}

				// 로그인되면 홈 화면으로 이동
				router.push("home")
				break
			}
		}
	}

	@action logout() {
		request("logout", this, handleOnLogout)
	}

	@action.bound handleOnLogout({ status, payload }) {
		switch (status) {
			case SUCCEED:
				popup("로그아웃되었습니다.")
			case FAILED:
			case ERROR: {
				this.userInfo = {} // 현재: 로그아웃이면 무조건 리셋, 이전: authToken이 없으면 로그아옷 상태로 판단, 이때 ID저장이 false이면 userInfo를 리셋함
				this.authToken = undefined
				this.loginInfo.password = "" // 배포본은 암호 저장은 항상하지 않음
				// router.reset("login")
				router.reset("intro")
				router.push("login")
				break
			}
		}
	}

	/**
	 * 겸직 정보를 선택한다.
	 *
	 * @param {number} i workInfos의 index
	 * @param {Object} i workInfo의 속성 중에서 검색할 내용 예) { userID:'1234' }
	 * @returns {boolean} 변경된 경우 true, 안된 경우 false
	 * @memberof AuthStore
	 */
	@action setWorkInfo(i) {
		if (typeof i === OBJECT) {
			i = _.findIndex(this.workInfos, i)
		}
		if (i < 0 || this.workInfos.length <= i) return false

		console.debug(this)
		this.workInfo = this.workInfos[i]
		this.timestamp = Date.now()
		return true
	}

	@action setFontSizes(i) {
		this.fontSizesIndex = i
		setFontSizes(i)
		this.timestamp = Date.now()
	}
}

// create the state
module.exports = store
const store = new AuthStore()

const hydrate = create({
	storage: AsyncStorage,
	// jsonify: true
})

hydrate(NAME$, store)
	.then(store => {
		console.debug(NAME$, "hydrated", "=".repeat(80))

		if (!store.timestamp) store.timestamp = Date.now()
		setFontSizes(store.fontSizesIndex)
		let currentScreen = router.getCurrentScreen()

		if (!store.agreed) {
			store.loginInfo.emailAddress = ""
			store.loginInfo.password = ""
			if (currentScreen !== "intro") return router.reset("intro") // "permissions"
		}
		/*
		if (__DEV__ && currentScreen && currentScreen != 'intro') {
			//Action.push(currentScreen)		// 연속으로 장면을 푸시하면 안됨
			return router.navigate(currentScreen)
		}*/
		if (store.userInfo) store.userInfo.touchedAt = yyyymmddhhmmss()
		// router.push(!store.authToken ? "login" : "home")	// 사용권한 체크 후 실행하는 것으로 변경
	})
	.catch(e => {
		console.warn(NAME$, "hydrate error", e)
	})
