/** Object Util */
const { OBJECT } = require("/constants")

// const isArray = Array.isArray
const keyList = Object.keys
const hasProp = Object.prototype.hasOwnProperty

// fast-deep-equal index.js 2.0.1
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
	isEqual,
}
