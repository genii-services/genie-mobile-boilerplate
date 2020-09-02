/**
 * [Common Module for node.js/React/ReactNative] function.js
 * FUNCTION 관련 유틸리티
 *
 * 200826 by appcreatier@gmail.com
 * 		callSafely try catch 추가, func.apply 버그 수정
 * 200602 by appcreatier@gmail.com
 * 		관련 함수만 모음
 * 		프로토타입 추가를 위한 부가 조치
 */
const { slice } = require("lodash")
/**
 * 지정한 인수가 실행가능한 함수이면 호출한다
 * @param {function} func
 */
const callSafely = function (func) {
	try {
		if (typeof func !== FUNCTION) return console.warn(this, arguments.callee.caller.name, "는 함수가 아닙니다.")
		return func.apply(func, slice(arguments, 1))
	} catch (e) {
		console.error("[" + func.name + "]", e.toString())
		debugger
	}
}

/**
 * 지정한 함수를 지정한 밀리초 후 호출한다
 * @param {function} func
 * @param {number} delay
 */
const debounce = (func, delay = 100) => {
	let timer
	return function () {
		const context = this
		const args = arguments
		clearTimeout(timer)
		timer = setTimeout(() => func.apply(context, args), delay)
	}
}

/**
 * 함수에 프로토타입 추가
 **/
{
	const { prototype } = Function
	prototype.callSafely = callSafely
	prototype.debounce = debounce
}

module.exports = {
	callSafely,
	debounce,
}
