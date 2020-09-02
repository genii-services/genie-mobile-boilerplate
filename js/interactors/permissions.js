/** 공통 라이브러리 */
const _ = require("lodash")
const Permissions = require("react-native-permissions")

exports.permissionz = require("/data/permissions")

let flagForCheck
exports.check = function (permissions, callback) {
	if (flagForCheck) return
	flagForCheck = true
	if (!permissions || !permissions.length) {
		Function.callSafely(callback, [])
		flagForCheck = false
		return
	}
	let results = []
	let permission = permissions[0]
	Permissions.check(permission).then((result) => {
		console.debug("permissions.check", permission, result)
		if (result !== "granted") results.push(permission)
		Function.callSafely(callback, results)
		flagForCheck = false
	})
	/*
	return Promise.all(_.map(permissions, permission => Permissions.check(permission))).then(result =>
		result.reduce((acc, value, i) => {
			acc[permissions[i]] = value
			return acc
		}, {}),
	)*/
}

let flagForRequest

exports.request = function (permissions, callback) {
	if (flagForRequest) return
	flagForRequest = true
	if (!permissions || !permissions.length) {
		Function.callSafely(callback, [])
		flagForRequest = false
		return
	}
	let results = []
	let permission = permissions[0]
	Permissions.request(permission).then((result) => {
		console.debug("permissions.request", result)
		if (result !== "granted") results.push(permission)
		Function.callSafely(callback, results)
		flagForRequest = false
	})
	/*
	return Promise.all(_.map(permissions, permission => Permissions.request(permission))).then(result =>
		result.reduce((acc, value, i) => {
			acc[permissions[i]] = value
			return acc
		}, {}),
	)*/
}
