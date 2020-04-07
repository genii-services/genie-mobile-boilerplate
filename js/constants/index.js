/**
 * 191119 공통 라이브러리
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

global.UNDEFINED = String.UNDEFINED = UNDEFINED
global.BOOLEAN = String.BOOLEAN = BOOLEAN
global.FUNCTION = String.FUNCTION = FUNCTION
global.NUMBER = String.NUMBER = NUMBER
global.OBJECT = String.OBJECT = OBJECT
global.STRING = String.STRING = STRING
global.ANDROID = String.ANDROID = ANDROID
global.IOS = String.IOS = IOS
global.WEB = String.WEB = WEB

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
