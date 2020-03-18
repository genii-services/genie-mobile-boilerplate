/** 앱 관련 라이브러리
 * 191206 소스 분리
 */
const { urlz } = require("/data/config")
const { browse } = require("./router")

function installApp(options) {
	console.debug("app.installApp", options)

	// let ver = options?.ver || ""
	// let ios = ver == "" ? config.ios : ver // TO-DO /next 처럼 임시 버전 다운로드에 대한 처리
	browse(`itms-interactors://?action=download-manifest&url=${urlz.downloadIpa}`)

	setTimeout(() => exitApp(), 1000) // 굳이 종료할 필요없으나, 이전 버전의 사용을 제한하기 위해 필요하고 웹브라우저가 열리기 전에 빨리 종료하면 아무것도 열리지 않기 때문에 시간지연하여 실행
}

module.exports = {
	installApp,
}
