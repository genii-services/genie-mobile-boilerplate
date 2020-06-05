/**
 * [Common Module for node.js/React/ReactNative] object.js
 * 오브젝트 관련 유틸리티
 *
 * 200602 by appcreatier@gmail.com
 * 		오브젝트 관련 함수만 모음
 * 		getType, getSubdividedType 추가
 * 200402 by appcreatier@gmail.com
 * 		isEqual 추가
 */
const { BOOLEAN, DATE, FUNCTION, NUMBER, OBJECT, STRING, UNDEFINED } = require("/constants")

/**
 * 변수의 이름을 반환한다.
 *
 * @param {*} object
 * @returns {string} name
 */
function getName(object) {
	switch (typeof object) {
		case FUNCTION:
			return object.name
		case STRING:
			return object
		case BOOLEAN:
		case UNDEFINED:
		case "null":
			break
		case NUMBER:
		case DATE:
			return object.toString()
		default:
			if (object != null) return object.name || object.prototype.name
	}
	return ""
}

/**
 * 변수형을 반환한다.
 * @param {*} object
 * @param {*} type	STRING: "string", "text", "label"
 * 					NUMBER: "number"
 * 					DATE: "date", "datetime", "moment"
 * 					FUNCTION: "function"
 * 					BOOLEAN: "boolean"
 * 					UNDEFINED: "undefined", "empty", "null"
 * 					OBJECT: "object", "unknown"
 */
function getType(v) {
	// console.debug('getType', v, type, typeof v)
	if (v == null) return UNDEFINED // v가 undefined, null인 경우
	type = typeof v
	if (type == OBJECT) {
		type = v.constructor.name
		type = type
			? type.toLowerCase()
			: moment.isMoment(v) // release 모드에서 Moment의 constructor.name가 이상하게 나옴
			? DATE
			: OBJECT
	}
	return type
}

/**
 * 세분화된 변수형을 반환한다.
 * @param {*} type	"string", "text", "label"
 * 					"number"
 * 					"date", "datetime", "moment"
 * 					"function"
 * 					"boolean"
 * 					"undefined", "empty", "null"
 * 					"obejct", "unknown"
 */
function getSubdividedType(v) {
	// console.debug('getDetailType', v, type, typeof v)
	if (v == null) type = "null"
	// v가 undefined, null인 경우
	else {
		type = typeof v
		if (type == OBJECT) {
			type = v.constructor.name
			type = type
				? type.toLowerCase()
				: moment.isMoment(v) // release 모드에서 Moment의 constructor.name가 이상하게 나옴
				? "moment"
				: "unknown"
		}
	}
	return type
}

// const { isArray } = Array
const keyList = Object.keys
const hasProp = Object.prototype.hasOwnProperty
function _isEqual(a, b) {
	if (a === b) return true

	if (a && b && typeof a == OBJECT && typeof b == OBJECT) {
		let a_Array = a instanceof Array,
			b_Array = b instanceof Array,
			i,
			length,
			key

		if (a_Array && b_Array) {
			length = a.length
			if (length != b.length) return false
			for (i = length; i-- !== 0; ) if (!_isEqual(a[i], b[i])) return false
			return true
		}

		if (a_Array != b_Array) return false

		let a_Date = a instanceof Date,
			b_Date = b instanceof Date
		if (a_Date != b_Date) return false
		if (a_Date && b_Date) return a.getTime() == b.getTime()

		let a_RegExp = a instanceof RegExp,
			b_RegExp = b instanceof RegExp
		if (a_RegExp != b_RegExp) return false
		if (a_RegExp && b_RegExp) return a.toString() == b.toString()

		let keys = keyList(a)
		length = keys.length

		if (length !== keyList(b).length) return false

		for (i = length; i-- !== 0; ) if (!hasProp.call(b, keys[i])) return false
		// end fast-deep-equal

		// Custom handling for React
		for (i = length; i-- !== 0; ) {
			key = keys[i]
			if (key === "_owner" && a.$$typeof) {
				// React-specific: avoid traversing React elements' _owner.
				//  _owner contains circular references
				// and is not needed when comparing the actual elements (and not their owners)
				// .$$typeof and ._store on just reasonable markers of a react element
				continue
			} else {
				// all other properties should be traversed as usual
				if (!_isEqual(a[key], b[key])) return false
			}
		}
		// fast-deep-equal index.js 2.0.1
		return true
	}
	return a !== a && b !== b
}

/**
 * 두 오브젝트를 깊숙히 비교하여 동일한지 판단한다
 * v2.0.1	fast-deep-equal index.js 2.0.1
 *
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
function isEqual(a, b) {
	try {
		return _isEqual(a, b)
	} catch (error) {
		if ((error.message && error.message.match(/stack|recursion/i)) || error.number === -2146828260) {
			// warn on circular references, don't crash
			// browsers give this different errors name and messages:
			// chrome/safari: "RangeError", "Maximum call stack size exceeded"
			// firefox: "InternalError", too much recursion"
			// edge: "Error", "Out of stack space"
			console.warn("Warning: react-fast-compare does not handle circular references.", error.name, error.message)
			return false
		}
		// some other error. we should definitely know about these
		throw error
	}
}

module.exports = {
	getName,
	getType,
	getSubdividedType,
	isEqual,
}
