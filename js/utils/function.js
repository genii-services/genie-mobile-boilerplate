/**
 * [Common Module for node.js/React/ReactNative] function.js
 * FUNCTION 관련 유틸리티
 *
 * 200602 by appcreatier@gmail.com
 * 		관련 함수만 모음
 * 		프로토타입 추가를 위한 부가 조치
 */

/**
 * 지정한 인수가 실행가능한 함수이면 호출한다
 * @param {function} func
 */
const callSafely = function (func) {
	if (typeof func !== FUNCTION) return console.warn(this, arguments.callee.caller.name, "는 함수가 아닙니다.")
	return func && func.apply(func, arguments)
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
