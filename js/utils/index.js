console.debug("utils")

const _ = require("lodash")

const { BOOLEAN, DATE, FUNCTION, NUMBER, STRING, UNDEFINED } = require("/constants")
const { toMoment } = require("./moment")

const deeply = _.mixin({
	deeply: function (map) {
		console.debug(this)
		return function (obj, fn) {
			let map2 = map ? map : _.isPlainObject(obj) ? _.mapValues : _.map
			let mv = map2(obj, function (v) {
				return _.isPlainObject(v)
					? _.deeply(_.mapValues)(v, fn)
					: v instanceof Array
					? v.map(function (x) {
							return _.deeply(map)(x, fn)
					  })
					: v
			})
			return map2(mv, fn)
		}
	},
})

const normalizeDeeply = (v, k) => {
	if (v instanceof Array) return _.map(v, (v) => normalizeDeeply(v))
	if (_.isPlainObject(v))
		return _(v)
			.mapKeys((v, k) => _.lowerFirst(k))
			.mapValues((v, k) => normalizeDeeply(v, k))
			.value()
	if (k && /(Updated$|DT$|Date$|Datetime$|DateTime$)/.test(k)) return v ? toMoment(v) : "" // new Date(v)로 하면 ISODateString 형태를 제대로 파싱하지 못함
	return v
}

function __find(collection, predicate, prop) {
	let item = _.find(collection, predicate)
	return item && prop ? item[prop] : item
}

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

const createAction = (type) => (payload) => ({ type, payload })

const payload = {}

function assign(object, ...sources) {
	if (!object) object = {}
	_.forEach(sources, (v) => {
		_.forEach(v, (vv, kk) => (object[kk] = vv))
	})
	return object
}

Boolean.prototype.isFalse = function (bool) {
	return typeof bool === BOOLEAN && !bool
}

Boolean.prototype.isTrue = function (bool) {
	return typeof bool === BOOLEAN && bool
}

Function.prototype.callSafely = function (func) {
	if (typeof func !== FUNCTION) return console.warn(this, arguments.callee.caller.name, "는 함수가 아닙니다.")
	return func && func.apply(func, arguments)
}

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

function parseJson(str) {
	let json
	try {
		json = JSON.parse(str)
	} catch (e) {
		console.warn(e)
	}
	return json
}

const debounce = (func, delay = 100) => {
	let timer
	return function () {
		const context = this
		const args = arguments
		clearTimeout(timer)
		timer = setTimeout(() => func.apply(context, args), delay)
	}
}

function createUuid() {
	// https://stackoverflow.com/a/2117523/11599918
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

module.exports = {
	deeply,
	normalizeDeeply,
	__find,
	delay,
	createAction,
	payload,
	assign,

	getName,
	parseJson,
	debounce,
	createUuid,
}
