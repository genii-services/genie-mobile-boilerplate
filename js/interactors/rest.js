/**
 * Rest Interfactor
 * 200311 전면 개편: function형 모듈(utils/rest)을 상속하는 app별 로직모듈(interactors/rest)로 분리
 **/
console.debug("interactors/rest")

const { originz } = require("/data/config")
const host = originz.api
const { apiz, errorMessagez, minRequestInterval } = require("/data/rest")
const { normalizeDeeply } = require("/utils")
const { appID, deviceID, deviceOS, osVersion, deviceType, appVersion, buildNumber } = require("/utils/device")
const { authInfo } = require("/coordinators/Auth")
const rest = require("/utils/rest")

rest.apiz = apiz
rest.errorMessagez = errorMessagez
rest.minRequestInterval = minRequestInterval

rest.prepair = paramz => {
	if (paramz.hasOwnProperty("pageIndex")) {
		// API 서버에서 페이징 처리시 첫페이지는 pageIndex가 1임
		if (!paramz.pageIndex || paramz.pageIndex < 1) {
			paramz.pageIndex = 1
		} else {
			paramz.pageIndex++
		}
	}
}

rest.finally = paramz => {
	if (paramz.hasOwnProperty("pageIndex")) {
		// API 서버에서 페이징 처리시 첫페이지는 pageIndex가 1임. 요청이 마무리되는 경우 pageIndex--를 하여 원상 복구
		paramz.pageIndex--
	}
}

// 인증필드 파라메터(기본값 포함)
rest.authFieldParamz = {
	authToken: "", // auth.authToken
	appID,
	deviceID,
	deviceOS,
	osVersion,
	deviceType,
	appVersion: appVersion + "." + buildNumber,
}

rest.getHeader = header => Object.assign({}, rest.defaultHeader, rest.getAuthHeader(), header)

rest.commonHandlerz = {
	onFailed: json => {
		console.warn("onFailed", json.ResultCode, json.ResultMessage)
		if (!json) return
		switch (json.ResultCode) {
			case "E00101": // 인증 실패
			case "E00102": // 블록된 단말
			case "E00103": {
				// 등록되지 않은 장치
				authInfo.authToken = undefined
				if (router.getCurrentScreen() !== "login") router.push("login")
			}
		}
	},
	onResulted: json => json.ResultCode == "S00000",
}

rest.payload = json => {
	return json.Data && normalizeDeeply(json.Data)
}

/*	테스트용 데모 데이터
apiz.getCompanyList.result = {
	Data:[
		{ CompanyID:'HC00', Name:'한일시멘트' },
		{ CompanyID:'HC01', Name:'한일네트웍스' },
	]
}
apiz.login.result = {
	Data: {
		AuthToken:'1',
		UserInfo: {
			EmpId:'201401002',
			CompanyID:'HC00',
			UserID:'HC00.201401002',
			UserName:'홍길동',
		}
	}
}
*/

module.exports = rest
