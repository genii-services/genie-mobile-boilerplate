const MODULE_NAME$ = "menuStore"
console.debug(MODULE_NAME$, "(re)load")

const _ = require("lodash")
const { observable, action } = require("mobx")
const { create, persist } = require("mobx-persist")
const AsyncStorage = require("@react-native-community/async-storage").default

const { OBJECT, MAP } = require("/constants")
const { Progress, isProgressive, SUCCEED } = require("/utils/progress")
const { popup } = require("/utils/view")
const { getMenuChilds } = require("/utils/menuList")
const { request } = require("/services/rest")
const authStore = require("./auth")

const initialState = {
	listMd5: "",
	list: {
		key: "mail",
		title: "메일",
		iconName: "ico-menu-mail",
		actionType: "launch",
		action: "mobilemail://",
		paramz: {
			type: "",
		},
	},
}

class MenuStore extends Progress {
	// @persist @observable md5 // 중복 다운로드 방지용
	// @persist(LIST) @observable list = observable.array([]) // 왼쪽 메뉴 목록
	// 겸직에 따라 종속되는 데이터 저장소
	@persist(MAP) @observable workInfoMap = observable.map({})
	@observable workInfo

	@action reset(workInfos) {
		if (workInfos) {
			_.forEach(workInfos, v => {
				let { userID } = v
				this.workInfoMap.set(userID, new Progress({ paramz: { userID } }))
			})
		} else {
			this.workInfoMap.clear()
		}
	}

	getWorkInfo(userID) {
		if (!userID) userID = authStore.workInfo.userID
		let workInfo = (this.workInfo = this.workInfoMap.get(userID))
		if (!workInfo) this.workInfoMap.set(userID, (workInfo = this.workInfo = new Progress({ paramz: { userID } })))
		return workInfo
	}

	@action reload(userID) {
		let progress = this.getWorkInfo(userID)
		progress.status = undefined
		progress.md5 = 0
		this.load(progress)
	}

	@action load(progress) {
		let { userID } = authStore.workInfo
		if (!progress) progress = this.getWorkInfo(userID)
		if (!progress) {
			popup("인증정보를 가져오기 위해 재로그인해야 합니다.")
			authStore.logout()
			return
		}
		progress.paramz = {
			userID,
		}
		request("getBoardListMd5", progress, handleOnLoadMd5)
	}

	@action.bound handleOnLoadMd5({ status, payload, progress }) {
		switch (status) {
			case SUCCEED: {
				let { md5 } = payload
				if (progress.md5 != md5) {
					progress.md5 = md5
					request("getBoardList", progress, handleOnLoad)
				}
				break
			}
		}
	}

	@action.bound handleOnLoad({ status, payload, progress }) {
		switch (status) {
			case SUCCEED: {
				let childs = payload.menu?.childs
				if (childs) progress.list = getMenuChilds(childs)
				break
			}
		}
	}

	getList(userID) {
		if (!userID) userID = authStore.workInfo?.userID
		let workInfo = userID && this.workInfoMap.get(userID)
		if (isProgressive(workInfo.status)) return []
		let list = workInfo?.list
		if (!list || !list.length) {
			this.reload(userID)
			list = []
		}
		return list
	}
}

module.exports = menuStore
const menuStore = new MenuStore()

const hydrate = create({
	storage: AsyncStorage,
	// jsonify: false,
})

hydrate(MODULE_NAME$, menuStore)
	.then(store => {
		console.debug(MODULE_NAME$, "hydrated")

		store.workInfoMap.forEach(v => (v.status = undefined))
	})
	.catch(e => {
		console.warn(MODULE_NAME$, "hydrate error", e)
	})
