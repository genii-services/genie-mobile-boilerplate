/**
 * [Common Module for node.js/React/ReactNative] json.js
 * JSON 관련 유틸리티
 *
 * 200602 by appcreatier@gmail.com
 * 		관련 함수만 모음
 */

function parseJson(str) {
	let json
	try {
		json = JSON.parse(str)
	} catch (e) {
		console.warn(e)
	}
	return json
}

module.exports = {
	parseJson,
}
