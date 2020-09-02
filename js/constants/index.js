/**
 * 공통 라이브러리
 *
 * 200825 globalThis로 변경
 * 191119
 */

const UNDEFINED = "undefined"
const BOOLEAN = "boolean"
const FUNCTION = "function"
const NUMBER = "number"
const OBJECT = "object"
const STRING = "string"

const LIST = "list"
const MAP = "map"

const ANDROID = "android"
const IOS = "ios"
const WEB = "web"

const UTF8 = "utf8"

// 전역 설정

globalThis.UNDEFINED = String.UNDEFINED = UNDEFINED
globalThis.BOOLEAN = String.BOOLEAN = BOOLEAN
globalThis.FUNCTION = String.FUNCTION = FUNCTION
globalThis.NUMBER = String.NUMBER = NUMBER
globalThis.OBJECT = String.OBJECT = OBJECT
globalThis.STRING = String.STRING = STRING
globalThis.ANDROID = String.ANDROID = ANDROID
globalThis.IOS = String.IOS = IOS
globalThis.WEB = String.WEB = WEB

module.exports = {
	UNDEFINED,
	BOOLEAN,
	FUNCTION,
	NUMBER,
	OBJECT,
	STRING,

	LIST,
	MAP,

	ANDROID,
	IOS,
	WEB,

	UTF8,
}
