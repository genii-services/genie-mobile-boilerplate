/**
 * [Common Module for node.js/React/ReactNative] utils/index.js
 * 기본적인 유틸리티 함수 모음
 *
 * 200602 by appcreatier@gmail.com
 * 		오브젝트 타입별로 재배치
 */
console.debug("utils")

function createUuid() {
	// https://stackoverflow.com/a/2117523/11599918
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

exports = module.exports = {
	...require("./object"),
	...require("./collection"),
	...require("./function"),
	...require("./boolean"),
	...require("./string"),
	...require("./json"),
	...require("./moment"),

	delay,
	createUuid,
}
