/**
 * debug 유틸리티
 *
 * 200825 globalThis로 변경
 * v3.1 at 191105 by appcreatier@gmail.com
 *		console.debug를 대체하도록 변경
 *		console.debug 첫번째 파라메터
 *			global인 경우 object 대신 global로 표시
 *			배열인 경우 ['className', 'methodName]
 * v2.0 at 180801 by appcreatier@gmail.com
 * 		console.debug 힝태
 * v1.0 at 170901 by appcreatier@gmail.com
 * 		whoami 형태
 */
console.debug("[utils/debug]")

const { OBJECT, STRING } = require("/constants")

/*
function handleError(e, isFatal) {
	try {
		//require('ExceptionsManager').handleException(e, isFatal)
		console.warn('[Exception]', e.stack)
	} catch(ee) {
	  	console.warn('Failed to print error: ', ee.message)
	}
}

var ErrorUtils = require('ErrorUtils')
ErrorUtils.setGlobalHandler(handleError)
*/

const logEnable = __DEV__ //"production" !== process.env.NODE_ENV

function whoami(_this_, _arguments_, deco = "1;94", optional) {
	if (logEnable === true)
		return `\x1b[${deco}m[${_this_ ? (typeof _this_ === OBJECT ? _this_.constructor.name : _this_.toString()) : "unknown"}.${
			_arguments_ ? (typeof _arguments_ === OBJECT ? _arguments_.callee.name : _arguments_.toString()) : optional || ""
		}]\x1b[0m`
	return `[${_this_ ? _this_.toString() : "unknown"}.${
		_arguments_ ? (typeof _arguments_ === OBJECT ? _arguments_.callee.name : _arguments_.toString()) : optional || ""
	}]`
}

function getCallerName(caller) {
	var f = arguments.callee.caller
	if (caller) f = f.caller
	var pat = /^function\s+([a-zA-Z0-9_]+)\s*\(/i
	pat.exec(f)
	var func = new Object()
	func.name = RegExp.$1
	return func
}
globalThis.getCallerName = getCallerName

// arrow function인 경우 특별히 지정하지 않은 경우 this가 undefined로 들어옴
function logDebug(object, ...attrs) {
	if (!logEnable) return

	let className, methodName
	if (object instanceof Array && 0 < object.length) {
		if (2 <= object.length) methodName = object[1]
		object = object[0]
	}

	if (object === globalThis) className = "global"
	else if (typeof object === "function") {
		className = object.name || object.constructor.name || object.__proto__.name
	} else {
		try {
			className = __DEV__ === true && typeof object === OBJECT ? object.constructor.name : object.toString()
		} catch (e) {
			className = ""
		}
	}
	if (!methodName) {
		// eslint-disable-next-line
		try {
			const s = whoami(object, arguments)
			methodName = arguments.callee.caller.name
		} catch (e) {
			methodName = ""
		}
	}
	let name =
		0 < className.indexOf(".")
			? className
			: className !== "" && methodName !== ""
			? `${className}.${methodName}`
			: className !== ""
			? className
			: methodName !== ""
			? methodName
			: "unknown"
	name = name.charAt(0) == "\x1b" ? name : __DEV__ === true ? `\x1b[1;94m[${name}]\x1b[0m` : `[${name}]`
	consoleDebug(name, ...attrs)
}

function logWarn() {
	if (!arguments.length) return
	if (typeof arguments[0] === STRING && arguments[0].indexOf("Require cycle") === 0) return
	consoleWarn(...arguments)
}

function trace() {
	consoleDebug(...arguments)
}

const consoleDebug = console.debug
const consoleWarn = console.warn

console.debug = logDebug
console.warn = logWarn

// globalThis.logDev = console.debug

module.exports = {
	getCallerName,
	whoami,

	logDebug,
	logWarn,

	trace,
}
