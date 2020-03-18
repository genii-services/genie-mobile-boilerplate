/** 공통 라이브러리
 *
 * 191206 STRING 상수 사용, export로 변경
 *
 * path.basename(path[, ext])
 * path.dirname(path)
 * path.extname(path)
 * path.format(pathObject)
 * path.isAbsolute(path)
 * path.join([...paths])
 * path.normalize(path)
 * path.parse(path)
 * path.relative(from, to)
 * path.resolve([...paths])
 * path.sep
 */
const _ = require("lodash")
const { STRING } = require("/constants")

function normalize(path) {
	valid(path)
	return `${path}/`
		.split(/\/+/g)
		.reduce((previous, current) => {
			if (!Array.isArray(previous)) previous = [previous]
			if (current === ".") return previous
			if (current === "..") previous.pop()
			else if (current.length) previous.push(current)
			return previous
		})
		.join("/")
}

function valid(path) {
	if (typeof path != STRING) {
		throw new TypeError("path must be string.")
	}
	return path
}

function basename(path, ext) {
	path = normalize(path)
	let basename = path.split(/\//g).pop()
	if (ext) {
		let tmp = basename.split(/\./g)
		let _ext = tmp.pop()
		if (ext === _ext || ext.slice(1) === _ext) {
			return tmp.join(".")
		}
	}
	return basename
}

/**
 * path.dirname()메소드는 pathUnix dirname명령 과 유사한 의 디렉토리 이름을 반환합니다 . 후행 디렉토리 구분 기호는 무시됩니다
 *
 * path.dirname('/foo/bar/baz/asdf/quux')
 * Returns: '/foo/bar/baz/asdf'
 *
 * @export
 * @param {*} path
 * @returns
 */
function dirname(path) {
	path = normalize(path)
	return path
		.split(/\//g)
		.slice(0, -1)
		.join("/")
}

function extname(path) {
	path = normalize(path)
	let tmp = path.replace(/^[\.]+/, "")
	return /\./.test(tmp) ? tmp.match(/\.[^.]*$/)[0] : ""
}

function format(options) {
	var { dir, root, base, name, ext } = options
	var _dir = dir || root
	var _base = base || `${name || ""}${/^\./.test(ext) ? "" : "."}${ext || ""}`
	return normalize(`${_dir}/${_base}`)
}

function isAbsolute(path) {
	return /^\//.test(path)
}

function parse(path) {
	path = normalize(path)
	let obj = {},
		tmp
	let components = path.split(/\//g)
	obj.base = components.pop()
	obj.dir = components.join("/")
	if (/^\//.test(obj.dir)) {
		obj.root = "/"
	}
	if (obj.base != undefined) {
		tmp = obj.base.replace(/^[\.]+/, "")
		if (/\./.test(tmp)) {
			obj.ext = tmp.match(/\.[^.]*$/)[0]
			obj.name = obj.base.slice(0, -obj.ext.length)
		} else {
			obj.name = obj.base
		}
	} else {
		delete obj.base
	}
	return obj
}

function resolve() {
	return _resolve.call({}, Array.prototype.slice.call(arguments, 0))
}

function _resolve(segments) {
	var flat = segments
		.reduce((previous, current) => {
			if (!Array.isArray(previous)) previous = [previous]
			if (Array.isArray(current)) Array.prototype.push.apply(previous, current)
			Array.prototype.push.call(previous, current)
			return previous
		})
		.reduce((previous, current) => {
			if (/^\//.test(current)) return current
			return `${previous}/${current}`
		})
	return normalize(flat)
}

function relative(base, path) {
	base = normalize(base)
	path = normalize(path)
	base = base.split(/\//g)
	path = path.split(/\//g)

	while (base[0] === path[0]) {
		base.shift()
		path.shift()
	}

	return Array(base.length)
		.fill("..")
		.concat(path)
		.join("/")
}

/**
 * 이 path.join()은 플랫폼별 구분 기호를 구분 기호로 사용하여 지정된 모든 세그먼트를 결합한 다음 결과 경로를 정규화합니다.
 * 길이가 0 인 path세그먼트는 무시됩니다.
 * 결합된 경로 문자열이 길이가 0 인 문자열 인 '.' 경우 현재 작업 디렉토리를 나타내는 문자열이 반환됩니다.
 *
 * @export
 * @param {*} first
 * @param {*} others
 * @returns string
 */
function join(first, ...others) {
	let str = first || ""
	_.forEach(others, v => {
		if (!v) return
		let len = str.length
		if (len && str.charAt(len - 1) == sep) str += v.charAt(0) == sep ? v.substr(1) : v
		else {
			str += v.charAt(0) == sep ? v : `/${v}`
		}
	})
	return str
}

/**
 * 플랫폼 별 경로 세그먼트 구분 기호를 제공합니다.
 *
 * 'foo/bar/baz'.split(path.sep);
 * Returns: ['foo', 'bar', 'baz']
 *
 * @export
 * @param {*} first
 * @param {*} others
 * @returns
 */
const sep = "/"

module.exports = {
	normalize,
	basename,
	dirname,
	extname,
	format,
	isAbsolute,
	parse,
	resolve,
	relative,
	join,
	sep,
}
