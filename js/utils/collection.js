/**
 * [Common Module for node.js/React/ReactNative] collection.js
 * 콜렉션 관련 유틸리티
 *
 * 200602 by appcreatier@gmail.com
 * 		관련 함수만 모음
 */
const _ = require("lodash")

const { toMoment } = require("./moment")

/**
 * 첫번째 오브젝트에 나머지 오브젝트의 속성을
 * @param {object} object
 * @param  {...any} sources
 */
const assign = (object, ...sources) => {
	if (!object) object = {}
	_.forEach(sources, (v) => {
		_.forEach(v, (vv, kk) => (object[kk] = vv))
	})
	return object
}

/**
 * 지정한 오브젝트를 지정한 함수로 깊숙히 실행한다
 */
const deeply = _.mixin({
	deeply: function (mapFunc) {
		console.debug(this)
		return function (obj, fn) {
			let childMapFunc = mapFunc ? mapFunc : _.isPlainObject(obj) ? _.mapValues : _.map
			let mv = childMapFunc(obj, function (v) {
				return _.isPlainObject(v)
					? _.deeply(_.mapValues)(v, fn)
					: v instanceof Array
					? v.map(function (x) {
							return _.deeply(mapFunc)(x, fn)
					  })
					: v
			})
			return childMapFunc(mv, fn)
		}
	},
})

/**
 * 지정한 오브젝트의 속성을 깊숙히 정규화한다
 * 정규화 내용:
 * 		키를 camel case로
 * 		시간 관련 속성인 경우 moment로
 * @param {object} v
 * @param {object} k
 */
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

/**
 * 콜렉션에서 조건으로 아이템을 찾는다
 * @param {object/array} collection
 * @param {*} predicate 찾는 조건
 * @param {*} prop 아이템을 찾았을 때 이 속성을 지정한 경우 이 속성값을 반환한다
 */
function __find(collection, predicate, prop) {
	let item = _.find(collection, predicate)
	return item && prop ? item[prop] : item
}

module.exports = {
	assign,
	deeply,
	normalizeDeeply,
	__find,
}
