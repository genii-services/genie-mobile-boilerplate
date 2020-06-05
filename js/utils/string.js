/**
 * [Common Module for node.js/React/ReactNative] string.js
 * 문자열 관련 유틸리티
 *
 * 200602 by appcreatier@gmail.com
 * 		toString type 인수를 지정한 경우 발생하는 오류 수정
 * 200310 by appcreatier@gmail.com
 * 		toString 타입 처리 최적화
 * 200309 by appcreatier@gmail.com
 * 		toSerialize 추가
 * 191206 by appcreatier@gmail.com
 * 		한일 소스 정리
 */
console.debug("utils/string")

const _ = require("lodash")

const { BOOLEAN, FUNCTION, NUMBER, OBJECT, STRING, UNDEFINED } = require("/constants")
const { parseJson } = require("/utils")
const { isMoment, yyyymmdd, yyyymmddhhmmss } = require("/utils/moment")

function toString(v, type, option) {
	// console.debug('toString', type, typeof v, v)
	if (v == null) type = "null"
	// v가 undefined, null인 경우
	else if (type) type = type.toLowerCase()
	else {
		type = typeof v
		if (type == OBJECT) {
			type = v.constructor.name
			type = type
				? type.toLowerCase()
				: isMoment(v) // release 모드에서 Moment의 constructor.name가 이상하게 나옴
				? "moment"
				: ""
		}
	}
	switch (type) {
		case STRING:
		case "text":
		case "label":
			return v
		case NUMBER:
			return isNaN(v) || Number(v) === 0 ? "" : v.toString()
		case "date":
		case "moment":
			return yyyymmdd(v, option)
		case "datetime":
			return yyyymmddhhmmss(v, option)
		case FUNCTION:
			return v()
		case BOOLEAN:
			return v ? "예" : "아니오"
		case UNDEFINED:
		case "empty":
		case "null":
			return ""
		case OBJECT:
			return JSON.stringify(v)
		case "user":
			return typeof v == STRING
				? parseJson(v)
				: v instanceof Array
				? _.map(v, (vv) => vv.DisplayName || vv.UserName).join(array, "\n")
				: typeof v == OBJECT
				? v.displayName || v.userName
				: v
	}
	// console.debug('toString', type || typeof v, v)
	return v.toString()
}

function toHex2(v) {
	const hex = parseInt(v).toString(16)
	switch (hex.length) {
		case 0:
			return "00"
		case 1:
			return "0" + hex
		case 2:
			return hex
	}
	return hex.slice(-2)
}

const log1024 = Math.log(1024)

function toFileSize(bytes) {
	if (bytes == 0) return "0.00 B"
	let e = Math.floor(Math.log(bytes) / log1024)
	let unit = " KMGTP".charAt(e)
	return `${(bytes / Math.pow(1024, e)).toFixed(2)} ${unit}B`
}

function toSerialize(collection, separator = ";") {
	return _.join(
		_.map(collection, (v, k) => encodeURIComponent(k) + "=" + (v ? encodeURIComponent(v) : "")),
		joinStr
	)
}

module.exports = {
	toString,
	toHex2,
	toFileSize,
	toSerialize,
}
