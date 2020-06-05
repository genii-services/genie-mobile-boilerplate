/**
 * [Common Module for node.js/React/ReactNative] boolean.js
 * BOOLEAN 관련 유틸리티
 *
 * 200602 by appcreatier@gmail.com
 * 		관련 함수만 모음
 * 		프로토타입 추가를 위한 부가 조치
 */

const { BOOLEAN } = require("/constants")

const isFalse = (bool) => typeof bool === BOOLEAN && !bool
const isTrue = (bool) => typeof bool === BOOLEAN && bool

/**
 * 함수에 프로토타입 추가
 **/
{
	const { prototype } = Boolean
	prototype.isFalse = isFalse
	prototype.isTrue = isTrue
}

module.exports = {
	isFalse,
	isTrue,
}
