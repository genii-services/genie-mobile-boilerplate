/**
 * react의 internalStorage 처럼 사용하기 위한 유틸리티 흡수 통합
 * 200825 globalThis 접근으로 변경
 * 200519 global.localStorage가 없는 경우 AsyncStorage를 global.localStorage에 설정
 */
console.debug("interactors/localStorage")

const _ = require("lodash")

const { FUNCTION } = require("/constants")
const { parseJson } = require("/utils")
const { bundleID } = require("/utils/device")

if (!globalThis.localStorage) globalThis.localStorage = require("@react-native-community/async-storage").default
const storage = globalThis.localStorage

const cachez = {}

function save(key = "data", data) {
	try {
		if (data) cachez[key] = data
		storage.setItem(bundleID + "." + key, JSON.stringify(config[key]))
	} catch (e) {
		console.warn("storage.save", key, e.message)
	}
}

function load(key = "data", callback) {
	storage
		.getItem(bundleID + "." + key)
		.then((v) => {
			//_.merge(config, parseJson(v))
			let data = parseJson(v)
			cachez[key] = data
			if (typeof callback === FUNCTION && !callback(data)) return
		})
		.catch((e) => {
			console.warn("storage.load", key)
		})
}

module.exports = {
	...storage,
	cachez,
	save,
	load,
}
