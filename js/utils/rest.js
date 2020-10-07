/**
 * RESTful 기반 통신 모듈
 * 200311 처리 루틴 전면 개편
 */
console.debug("utils/rest")

const _ = require("lodash")

const { errorMessagez, minRequestInterval } = require("/data/rest")
const { whoami } = require("/utils/debug")
const { toSerialize } = require("/utils/string")
const { isPreterite, IGNORE, PREPARING, PROCESSING, SUCCEED, FAILED, ERROR } = require("/utils/progress")

const authFieldName = "X-HanilMobile-Header"
const doNothing = () => {}

const rest = {
	apiz: {},
	defaultHeader: {
		Accept: "application/json",
		// "Content-Type":"application/json"
	},
	authFieldParamz: {},
	commonHandlerz: {},
	prepair: doNothing,
	getHeader: doNothing,
	finally: doNothing,
}

function request(name, progress, callback, additionals) {
	const whoami$ = whoami("rest", name, "1;95")

	function changeStatue(paramz, callback) {
		try {
			let { status, progress, description } = paramz
			if (description) console.debug(whoami$, description)
			Function.callSafely(callback, paramz)
			if (progress) {
				progress.status = status
				progress.timestamp = paramz.timestamp || Date.now()
			}
			if (isPreterite(status)) rest.finally(paramz)
		} catch (e) {
			console.error("utils/rest.changeStatue", e)
		}
	}

	try {
		const api = rest.apiz[name]
		if (!api) return changeStatue({ status: ERROR, message: "API가 없습니다.", name, progress, ...additionals }, callback)

		if (!progress) progress = createProgress()

		const interval = (progress.timestamp = Date.now()) - progress.timestamp
		if (interval < minRequestInterval)
			return changeStatue(
				{ status: IGNORE, description: `${interval}ms로써 요청 무시`, name, progress, ...additionals },
				callback
			)

		switch (progress.status) {
			case PREPARING:
			case PROCESSING:
				return changeStatue(
					{ status: IGNORE, name, progress, description: "처리중 들어온 요청 무시", ...additionals },
					callback
				)
		}

		progress.status = rest.prepair(progress.paramz)
		changeStatue({ status: PREPARING, name, progress, ...additionals }, callback)

		const { method = "GET" } = api
		const header = rest.getHeader(progress.header)
		let uri = "",
			body,
			paramz = {}
		switch (api.requestType) {
			case "body/json":
				uri = host + api.url
				body = JSON.stringify(progress.paramz)
				break
			default:
				const p = progress.paramz || {}
				_.forEach(api.paramz, (v, k) => (paramz[k] = p[k] || v))
				uri = getUri(host + api.url, paramz)
		}

		console.debug(whoami$, PROCESSING, method, uri)
		changeStatue({ status: PROCESSING, name, progress, paramz, header, body, ...additionals }, callback)

		let handler
		const { commonHandlerz = {} } = rest
		const postFetch = (responseJson) => {
			handler = api.onResulted || commonHandlerz.onResulted
			const isSuccess = handler && handler.call(this, responseJson)
			if (!isSuccess) {
				console.warn(whoami$, FAILED, responseJson.ResultMessage)
				changeStatus({ status: FAILED, payload: responseJson, paramz, name, progress, ...additionals }, callback)
				if (responseJson.ResultCode != "S00000") {
					popup(responseJson.ResultMessage, api.title)
					handler = api.onFailed || commonHandlerz.onFailed
					handler && handler.call(this, responseJson)
					handler = api.onFinally || commonHandlerz.onFinally
					handler && handler.call(this)
					return
				}
			}
			const payload = rest.payload(responseJson)

			console.debug(whoami$, SUCCEED, payload)
			changeStatus(callback, { status: SUCCEED, name, status, payload, progress, paramz, ...additionals })
			handler = api.onSucceed || commonHandlerz.onSucceed
			handler && handler.call(this, payload)
			handler = api.onFinally || commonHandlerz.onFinally
			handler && handler.call(this, payload)
		}

		fetch(uri, { method, header, body })
			.then((response) => {
				if (response.status != 200) {
					popup("서버에서 비정상적인 결과를 받았습니다. 서버관리자에게 문의하세요", api.title)
					console.warn(whoami$, FAILED, status, response)
					changeStatue({ status: FAILED, progress, payload: response, paramz, name, ...additionals }, callback)
					throw "exit"
				}
				return response.json()
			})
			.then((responseJson) => postFetch(responseJson))
			.catch((error) => {
				if (error == "exit") return
				if (__DEV__ && api.result) return postFetch(api.result)
				const message = errorMessagez[error.message] || error.message
				popup("서버관리자에게 문의바랍니다.\n" + message, api.title)
				console.warn(whoami$, ERROR, error.toString(), "\n" + uri, method, header, body)
				changeStatue({ status: ERROR, error, message, progress, paramz, name, ...additionals }, callback)
				handler = api.onFinally || commonHandlerz.onFinally
				handler && handler.call(this)
			})
	} catch (e) {
		console.error(whoami$, e)
	}
}

// 직렬화된 인증필드 값(문자열)
let authFieldValue

function setAuthField(paramz) {
	authFieldValue = toSerialize(assign(rest.authFieldParamz, paramz))
}

function getAuthFieldValue(paramz) {
	return paramz ? toSerialize(assign({}, rest.authFieldParamz, paramz)) : authFieldValue
}
/**
 * 인증 관련 헤드필드 1개만 가지고 있는 오브젝트를 반환
 *
 * @param {*} fieldz
 * @returns {object}
 */
function getAuthHeader(paramz) {
	return { [authFieldName]: getAuthFieldValue(paramz) }
}

function getUri(url, paramz) {
	if (!paramz || paramz === "") return ""
	const s = toSerialize(paramz, "&")
	return url + s.length ? "?" + s : ""
}

/**
 * 이전 방식으로써
 * apiz = {	checkAppVersion: { ... }, ... }를 지정한 경우
 * res.checkAppVersion(...)로 호출 가능
 *
 * @param {object} apiz
 */
function attachApiz(apiz) {
	_.forEach(apiz, (v, k) => {
		rest[k] = (paramz, callback) => request(k, { paramz }, callback)
	})
}

exports = module.exports = rest
exports.request = request
exports.getAuthHeader = getAuthHeader
exports.getUri = getUri
exports.request = request
exports.attachApiz = attachApiz
