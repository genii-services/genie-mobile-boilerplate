const _ = require("lodash")

exports.getStyle = (style, prop) => {
	if (style instanceof Array) {
		let value
		_.forEach(style, v => !(value = getStyle(v, prop)))
		return value
	}
	return style[prop]
}
