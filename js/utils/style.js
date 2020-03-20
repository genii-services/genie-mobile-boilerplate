const _ = require("lodash")

exports.getStyle = (style, prop) => {
	if (style instanceof Array) {
		let value
		_.forEach(style, v => !(value = getStyle(v, prop)))
		return value
	}
	return style[prop]
}

const { connectStyle } = require("/styles")

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

exports.connectStyle = (Component, styleName) => connectStyle(styleName || Component.name, {}, mapPropsToStyleNames)(Component)
