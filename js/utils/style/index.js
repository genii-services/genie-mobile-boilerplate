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

const Theme = require("./Theme")

module.exports = {
	getStyle,
	connectStyle: (Component, styleName) => connectStyle(styleName || Component.name, {}, mapPropsToStyleNames)(Component),

	clearThemeCache: connectStyle.clearThemeCache,
	INCLUDE: require("./resolveIncludes").INCLUDE,
	StyleProvider: require("./StyleProvider"),
	Theme,
	createVariations,
	createSharedStyle,
}

// Prepair Default Theme

const { OBJECT, STRING } = require("/constants")

const elementStylez = require("/styles/elements")
const defaultStyle = require("/styles/themes/light")
const _theme = {
	defaultStyle,
	IconNBElement: { ...elementStylez.Icon(defaultStyle) },
	PickerNBElement: { ...elementStylez.Picker(defaultStyle), ButtonElement: { TextElement: {} } },
	TabsElement: { flex: 1 },
}
_.forEach(elementStylez, (v, k) => (_theme[k + "Element"] = v(defaultStyle)))

const cssifyTheme = (grandParent, parent, parentName) => {
	_.forEach(parent, (style, styleName) => {
		if (grandParent && styleName.indexOf(".") === 0 && parentName.indexOf(".") === 0) {
			if (!grandParent[styleName]) grandParent[styleName] = {}
			grandParent[styleName][parentName] = style
		}
		if (style && typeof style === OBJECT) {
			switch (styleName) {
				case "fontVariant":
				case "transform":
					break
				default:
					cssifyTheme(parent, style, styleName)
			}
		}
	})
}

cssifyTheme(null, _theme, null)

/**
 * Sets the given style as a default theme style.
 */
let defaultTheme = new Theme(_theme)

const { globalStore } = require("/hooks")

globalStore.set("theme", defaultTheme, { persist: true })

/**
 * Returns the default theme that will be used as fallback
 * if the StyleProvider is not configured in the app.
 */
function getDefaultTheme() {
	if (!defaultTheme) defaultTheme = new Theme({})
	return defaultTheme
}

/**
 * 제공된 컨텍스트에서 테마 오브젝트를 리턴하거나
 * 컨텍스트에 테마가 없는 경우 빈 테마를 반환
 *
 * @param theme 리액트 컴포넌트 컨텍스트
 * @returns {Theme} 테마 오브젝트
 */
function getTheme(theme) {
	// Fallback to a default theme if the component isn't rendered in a StyleProvider.
	return theme || getDefaultTheme()
}

exports.mapPropsToStyleNames = (styleNames, props) => keys(props)

exports.flattenStyle = style => style.reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])

const {
	StyleSheet: { flatten },
} = require("react-native")

exports.mergeStyle = function(style, defaultStyle) {
	// Pass the merged Style Object instead
	if (style) return
	const newStyle = {}
	if (Array.isArray(style)) {
		_.forEach(style, v => _.merge(newStyle, typeof v === "number" ? flatten(v) : v))
	} else if (typeof style === "number") {
		newStyle = flatten(style)
	} else {
		newStyle = style
	}
	return _.merge({}, defaultStyle, newStyle)
}