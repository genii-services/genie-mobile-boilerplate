/** host 파일 수정
 *	sudo nano /private/etc/hosts
 *
 *	192.168.0.98    hgyu_gwif.hanil.com
 *	172.19.1.104    gwif.hanil.dev
 */
// Environments
const LOCAL = "local"
const DEVELOPMENT = "development"
const TRUNK = "trunk"
const INTEGRATION = "integration"
const TESTING = "testing"
const STAGING = "staging"
const PRODUCTION = "production"

const serverEnv = DEVELOPMENT

const domainName =
	[LOCAL, DEVELOPMENT, TRUNK, INTEGRATION, TESTING].indexOf(serverEnv) >= 0
		? "hanildev.com" // Dev Server
		: [STAGING].find(serverEnv) >= 0
		? "hanildev.com" // Staging Server
		: "hanil.com" // Production Server

const originz = {
	api: `https://gwif.${domainName}`, // API 서버
	mobile: `https://mobile.${domainName}`, // 다운로드 서버
	portal: `https://gw.${domainName}`, // 포털 서버
	email: `https://email.${domainName}`, // 웹메일 서버
}

const urlz = {
	download: `${originz.mobile}/mobileapp`, // 앱 다운로드 페이지 URL
	downloadApp: `${originz.mobile}/mobileapp/download/`, // 앱 다운로드 URL
	downloadIpa: `${originz.mobile}/download/hdev/hanil_mgw_manifest.plist`, // IPA 다운로드 URL

	downloadFile: `${originz.api}/board/GetArticleAttachmentFile`,
	profileImage: `${originz.portal}/UserProfilePhoto/$id.jpg`, // 프로필 사진 다운로드 URL

	webmail: `${originz.email}/owa/#path=/mail`, // OWA
}

if (serverEnv === PRODUCTION) {
	urlz.downloadIpa = `${originz.mobile}/download/hanil_mgw_manifest.plist`
}

module.exports = {
	LOCAL,
	DEVELOPMENT,
	TRUNK,
	INTEGRATION,
	TESTING,
	STAGING,
	PRODUCTION,

	serverEnv,
	domainName,
	originz,
	urlz,
}
