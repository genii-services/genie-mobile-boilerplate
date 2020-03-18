const _ = require("lodash")
const { observable, action } = require("mobx")

const { STRING } = require("/constants")
const { Progress, REQUESTING, SUCCEED, FAILED, ERROR } = require("/utils/progress")
const { assign } = require("/utils")
const { request } = require("/services/rest")
const authStore = require("./auth")

let whiteList = [
	"displayName",
	"jobDescription", // 담당업무
	//["workplace","jobName"],
	//["workplace","rankName"],
	"enterDate", // 입사일
	"parentDeptDescription",
	"mobileTel",
	"officeTel",
	"homeTel",
	//"fax",
	//"locationName",
]

class UserStore extends Progress {
	list = []

	@observable item = {
		//paramz: {},
		userInfo: {},
		userProps: [],
		defaultz: {},
	}
	@observable appointments = {
		list: [],
	}

	@action clear() {
		this.paramz.pageIndex = 0
		this.paramz = {}
		this.status = undefined
		this.list = []
		this.dept = []
		this.org = []
		this.deptInfo = { paramz: {} }
		this.orgInfo = { paramz: {} }
	}

	@action load(paramz) {
		let progress = this
		paramz = assign(this.paramz, paramz, {
			userID: authStore.workInfo.userID,
			companyID: authStore.workInfo.companyID,
		})
		if (!paramz.keyword) {
			progress.status = undefined
			return //console.debug(this, '검석어를 지정하지 않아서 무시합니다.')
		}
		// 페이징 첫페이지인 경우 배열 초기화
		if (!paramz.pageIndex || paramz.pageIndex < 1) progress.list.length = 0 // this.list.splice(0, this.list.length)

		request("searchUser", progress, handleOnLoad)
	}

	@action.bound handleOnLoad({ status, payload, progress }) {
		switch (status) {
			case REQUESTING: {
				break
			}
			case SUCCEED: {
				let list = payload.items
				if (list.length) progress.list = progress.list.concat(list)
			}
		}
	}

	reload(paramz = {}) {
		paramz.pageIndex = 0
		this.load(paramz)
	}

	@action loadItem(item) {
		if (!item || !item.userID) return

		this.item = {
			paramz: { userID: item.userID },
			userInfo: {},
			itemProps: [],
			defaultz: {},
		}
		request("getUserInfo", this.item, handleOnLoadItem)
		return item
	}

	@action.bound handleOnLoadItem({ status, payload, progress }) {
		let item = progress
		switch (status) {
			case SUCCEED: {
				const protoz = fieldz
				//console.debug(this, fieldz)
				//let item = payload.userInfo
				item.userInfo = payload.userInfo
				let defaultz = {}
				let userProps = []
				_.forEach(whiteList, (v, k) => {
					let proto = typeof v === STRING ? protoz[v] : protoz[v[1]]
					if (!proto) return
					let datum = typeof v === STRING ? payload.userInfo[v] : payload.userInfo[v[0]][v[1]]
					//if(!proto || !datum) return
					switch (proto.type) {
						case "mobile": {
							defaultz.tel = defaultz.sms = datum
							break
						}
						case "tel": {
							if (!defaultz.tel) defaultz.tel = datum
							break
						}
						case "mail": {
							if (!defaultz.mail) defaultz.mail = datum
							break
						}
					}
					userProps.push({ key: k, label: proto.label, value: datum, type: proto.type })
				})
				if (!defaultz.mail) defaultz.mail = item.userInfo.emailAddress
				item.userProps = userProps
				item.defaultz = defaultz

				//console.debug(this, item)
				break
			}
		}
	}

	@action loadAppointments(item) {
		if (!item) return

		this.appointments.paramz = { userID: item.empID } // 인수명은 userID이나 empID를 전달해야 함
		request("getUserAppointments", this.appointments, handleOnLoadAppointments)
		return this.appointments
	}

	@action.bound handleOnLoadAppointments({ status, payload, progress }) {
		switch (status) {
			case SUCCEED: {
				progress.timestamp = Date.now()
				this.appointments.list = payload
				break
			}
		}
	}

	// 조직도 관련
	deptInfo = new Progress()
	@observable dept = observable.array([]) // 부서목록
	orgInfo = new Progress()
	@observable org = observable.array([]) // 부서 step

	@action loadDept(paramz) {
		let parentID = paramz.deptCode
		let companyID = _.split(parentID, ".")[0]
		paramz = assign(this.deptInfo.paramz, paramz, {
			parentID,
			companyID, // authStore.workInfo.companyID
		})
		request("searchDeptTree", this.deptInfo, handleOnSearchDeptTree)

		if (paramz.parentID) {
			// 부서 사우정보 조회
			let keyword = paramz.parentID
			let companyID = _.split(keyword, ".")[0]
			this.orgInfo.paramz = {
				searchType: "DEPTID",
				keyword,
				companyID, // authStore.workInfo.companyID,
				pageIndex: 0,
			}
			request("searchUser", this.orgInfo, handleOnSearchUser)
		}
	}

	@action.bound handleOnSearchDeptTree({ status, payload, progress }) {
		switch (status) {
			case SUCCEED: {
				let dept = payload.items
				if (dept.length) {
					for (let i = 0; i < dept.length; i++) dept[i].userID = dept[i].deptCode // 배열 두개를 통합할때 키값이 있어야 했다.
					this.dept = dept
				} else {
					this.dept = []
				}
			}
			case FAILED:
			case ERROR: {
				this.timestamp = Date.now()
				break
			}
		}
	}

	@action.bound handleOnSearchUser({ status, payload }) {
		switch (status) {
			case SUCCEED: {
				let list = payload.items
				if (list.length < this.paramz.pageSize) progress.timestamp = Date.now()
				if (list.length) this.dept = this.dept.concat(list)
			}
			case FAILED:
			case ERROR: {
				this.timestamp = Date.now()
				break
			}
		}
	}
}

module.exports = new UserStore()

console.debug("userStore", "(re)loaded")
