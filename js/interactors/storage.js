console.debug("interactors/storage")

const _ = require("lodash")
const { getItem, setItem } = require("@react-native-community/async-storage").default

const { FUNCTION } = require("/constants")
const { parseJson } = require("/utils")
const { bundleID } = require("/utils/device")

const cachez = {}

function save(key = "data", data) {
	try {
		if (data) cachez[key] = data
		setItem(bundleID + "." + key, JSON.stringify(config[key]))
	} catch (e) {
		console.warn("storage.save", key, e.message)
	}
}

function load(key = "data", callback) {
	getItem(bundleID + "." + key)
		.then(v => {
			//_.merge(config, parseJson(v))
			let data = parseJson(v)
			cachez[key] = data
			if (typeof callback === FUNCTION && !callback(data)) return
		})
		.catch(e => {
			console.warn("storage.load", key)
		})
}

module.exports = {
	cachez,
	save,
	load,
}
