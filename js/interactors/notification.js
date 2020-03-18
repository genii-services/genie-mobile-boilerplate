/** 공통 라이브러리 */
console.debug("interactors/notification")

const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { itsAndroid, itsIOS } = require("/utils/device")
const { popup } = require("/utils/view")
const { upgradeApp } = require("/utils/app")
const providers = require("/coordinators")

let tokenRefreshListener
let messageListener

let notification = itsAndroid
	? require("/utils/notification.android")
	: itsIOS
	? require("/utils/notification.ios")
	: { register: () => {}, unregister: () => {} }

const typeNamez = {
	unknown: "알수없음",
	0: "전자결재",
	1: "공지사항",
	99: "업그레이드 알림",
}

notification.receiveNotification = function(noti) {
	let type = noti.data?.type || noti.type || typeNamez.unknown
	let title = noti.data?.title || noti.title
	let body = noti.data?.body || noti.body
	if (!body && title) {
		body = title
		title = typeNamez[type]
	}
	if (!title) title = "푸시 알림"
	// let uniqueid = noti.data?.uniqueid || noti.uniqueid
	let userID = noti.data?.userid || noti.userid

	boyd = "\n" + JSON.stringify(noti.data)
	if (!body) return action()

	popup(body, title, [
		{ text: "취소", style: "cancel" },
		{ text: "이동", onPress: () => action() },
	])

	function action() {
		// if (userID) providers.auth.setWorkInfo({ userID })

		switch (type) {
			case "1": {
				// 공지사항
				let board = providers.boardz.getBoard("Announcementsoneaday")
				let articleID //= uniqueid
				if (articleID) router.push("detailArticle", { board, articleID, userID })
				else router.push("listArticle", { board, userID })
				break
			}
			case "99": {
				upgradeApp({ cancelable: true })
				break
			}
			default: {
				console.warn("알수없는 알림 유형", type, noti)
				debugger
			}
		}
	}
}

module.exports = notification
