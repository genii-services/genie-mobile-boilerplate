const _ = require("lodash")
const {
	StyleSheet: { flatten },
} = require("react-native")

const { FUNCTION, NUMBER, OBJECT, STRING } = require("/constants")
const Theme = require("./Theme")

//─────────────────────
// 		FUNCTIONS
//─────────────────────

const getStyle = (style, prop) => {
	if (style instanceof Array) {
		let value
		_.forEach(style, (v) => !(value = getStyle(v, prop)))
		return value
	}
	return style[prop]
}

const flattenStyle = (style) => style.reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])

const mergeStyle = function (style, defaultStyle) {
	// Pass the merged Style Object instead
	if (style) return
	let newStyle = {}
	if (Array.isArray(style)) {
		_.forEach(style, (v) => _.merge(newStyle, typeof v === "number" ? flatten(v) : v))
	} else if (typeof style === "number") {
		newStyle = flatten(style)
	} else {
		newStyle = style
	}
	return _.merge({}, defaultStyle, newStyle)
}

const getMarginTop = (style, defaultValue = 0) => {
	if (!style) return defaultValue
	if (typeof style.marginTop === NUMBER) return style.marginTop
	if (typeof style.marginVertical === NUMBER) return style.marginVertical
	if (typeof style.margin === NUMBER) return style.margin
	return defaultValue
}

const getMarginRight = (style, defaultValue = 0) => {
	if (!style) return defaultValue
	if (typeof style.marginRight === NUMBER) return style.marginRight
	if (typeof style.marginHorizontal === NUMBER) return style.marginHorizontal
	if (typeof style.margin === NUMBER) return style.margin
	return defaultValue
}

const getMarginBottom = (style, defaultValue = 0) => {
	if (!style) return defaultValue
	if (typeof style.marginBottom === NUMBER) return style.marginBottom
	if (typeof style.marginVertical === NUMBER) return style.marginVertical
	if (typeof style.margin === NUMBER) return style.margin
	return defaultValue
}

const getMarginLeft = (style, defaultValue = 0) => {
	if (!style) return defaultValue
	if (typeof style.marginLeft === NUMBER) return style.marginLeft
	if (typeof style.marginHorizontal === NUMBER) return style.marginHorizontal
	if (typeof style.margin === NUMBER) return style.margin
	return defaultValue
}

/**
 * Sets the given style as a default theme style.
 */
let defaultTheme = new Theme(_theme)

/**
 * Returns the default theme that will be used as fallback
 * if the StyleProvider is not configured in the app.
 */
function getDefaultTheme() {
	if (!defaultTheme) defaultTheme = new Theme({})
	return defaultTheme
}

/**
 * 제공된 컨텍스트에서 테마 오브젝트를 리턴하거나 컨텍스트에 테마가 없는 경우 빈 테마를 반환
 *
 * @param theme 리액트 컴포넌트 컨텍스트
 * @returns {Theme} 테마 오브젝트
 */
function getTheme(theme) {
	// Fallback to a default theme if the component isn't rendered in a StyleProvider.
	return theme || getDefaultTheme()
}

//─────────────────────
// STASTIC CONSTRUCTOR
//─────────────────────

// Prepair Default Theme

const elementStylez = require("/styles/elements")
let defaultStyle = require("/styles/themes/light")
if (typeof defaultStyle === FUNCTION) defaultStyle = Function.callSafely(defaultStyle)
const _theme = {
	defaultStyle,
	IconNBElement: { ...elementStylez.Icon(defaultStyle) },
	PickerNBElement: { ...elementStylez.Picker(defaultStyle), ButtonElement: { TextElement: {} } },
	TabsElement: { flex: 1 },
}
_.forEach(elementStylez, (v, k) => (_theme[k + "Element"] = v(defaultStyle)))

const cssifyTheme = (grandParent, parent, parentName) => {
	_.forEach(parent, (style, styleName) => {
		if (
			grandParent &&
			typeof styleName === STRING &&
			styleName.indexOf(".") === 0 &&
			typeof parentName === STRING &&
			parentName.indexOf(".") === 0
		) {
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

const { globalStore } = require("/hooks")
const { debug } = require("react-native-reanimated")

globalStore.set("theme", defaultTheme, { persist: true })

//─────────────────────
// 		EXPORTS
//─────────────────────

exports = module.exports = {
	INCLUDE: require("./resolveIncludes").INCLUDE,
	StyleProvider: require("./StyleProvider"),
	Theme,
	...require("./addons"),
	...require("./connect"),

	getStyle,
	flattenStyle,
	mergeStyle,
	getMarginTop,
	getMarginRight,
	getMarginBottom,
	getMarginLeft,
}
