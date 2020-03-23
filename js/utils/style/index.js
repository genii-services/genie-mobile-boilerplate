const _ = require("lodash")

const getStyle = (style, prop) => {
	if (style instanceof Array) {
		let value
		_.forEach(style, v => !(value = getStyle(v, prop)))
		return value
	}
	return style[prop]
}

const mapPropsToStyleNames = (styleNames, props) => {
	const keys = _.keys(props)
	const values = _.values(props)

	_.forEach(keys, (key, index) => {
		if (values[index]) {
			styleNames.push(key)
		}
	})

	return styleNames
}

const connectStyle = require("./connectStyle")
const { createVariations, createSharedStyle } = require("./addons")

module.exports = {
	getStyle,
	connectStyle: (Component, styleName) => connectStyle(styleName || Component.name, {}, mapPropsToStyleNames)(Component),

	clearThemeCache: connectStyle.clearThemeCache,
	INCLUDE: require("./resolveIncludes").INCLUDE,
	StyleProvider: require("./StyleProvider"),
	Theme: require("./Theme"),
	createVariations,
	createSharedStyle,
}
