const _ = require("lodash")
const { FUNCTION, NUMBER, OBJECT, STRING } = require("/constants")

const getStyle = (style, prop) => {
	if (style instanceof Array) {
		let value
		_.forEach(style, (v) => !(value = getStyle(v, prop)))
		return value
	}
	return style[prop]
}

const mapPropsToStyleNames = (styleNames, props) => {
	const keys = _.keys(props)
	const values = _.values(props)

	_.forEach(keys, (key, index) => {
		values[index] && styleNames.push(key)
	})
	return styleNames
}

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

const flattenStyle = (style) => style.reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])

const {
	StyleSheet: { flatten },
} = require("react-native")

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

/**
 * 구성 요소 스타일 변형을 나타내는 모든 스타일 특성과 매치
 * 이러한 스타일은 styleName 속성을 사용하여 구성 요소에 적용할 수 있습니다.
 * 모든 스타일 변형 속성 이름은 단일 '.'로 시작해야 합니다. 문자 (예 : '.variant')
 *
 * @param propertyName 스타일 속성 이름
 * @returns {boolean} style 속성이 변형된 구성 요소를 나타내는 경우 true이고, 그렇지 않으면 false입니다.
 */
const isStyleVariant = (propertyName) => /^\./.test(propertyName)

/**
 * 지정한 속성 이름이 하위 컴포넌트를 대상으로 하는 스타일 규칙인지 판단한다.
 * 이러한 스타일은 두 가지 형식이 있는데,
 * 컴포넌트 이름 ( 'elements.Text')와 컴포넌트 이름 및 변형 ( 'elements.Text.line-through')으로
 * 컴포넌트를 대상으로 지정할 수 있습니다.
 * 컴포넌트 이름을 지정하는 것 외에도 이러한 스타일은
 * '*'와일드 카드 ( '*'또는 '* .line-through')를 사용하여
 * 모든 구성 요소를 대상으로 할 수도 있습니다.
 * 이러한 스타일을 식별하는 규칙은 '.'을 포함해야한다는 것입니다.
 * 이름에 문자를 포함 시키거나 '*'이어야 합니다.
 *
 * @param propertyName The style property name.
 * @returns {boolean} True if the style property represents a child style, false otherwise.
 */
// const isChildStyle = (propertyName) => /(^[^\.].*\.)|^\*$/.test(propertyName)
const isChildStyle = (propertyName) => /^[A-Z]|^\*$/.test(propertyName)

const isPureStyle = (propertyName) => /^[a-z]|^\*$/.test(propertyName)

const getConcreteStyle = (style) => _.pickBy(style, (value, key) => isPureStyle(key))

/**
 * Splits the style into its parts:
 * component style - concrete style that needs to be applied to a component
 * style variants - variants that can be applied to a component by using styleName prop
 * children style - style rules that need to be propagated to component children
 *
 * @param style The style to split.
 * @returns {*} An object with the componentStyle, styleVariants, and childrenStyle keys.
 */
function splitStyle(style) {
	return _.reduce(
		style,
		(result, value, key) => {
			const styleSection = isStyleVariant(key)
				? result.styleVariants
				: isChildStyle(key)
				? result.childrenStyle
				: result.componentStyle
			styleSection[key] = value
			return result
		},
		{
			componentStyle: {},
			styleVariants: {},
			childrenStyle: {},
		}
	)
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

const { createVariations, createSharedStyle } = require("./addons")

const Theme = require("./Theme")

exports = module.exports = {
	getStyle,

	INCLUDE: require("./resolveIncludes").INCLUDE,
	StyleProvider: require("./StyleProvider"),
	Theme,
	createVariations,
	createSharedStyle,

	isStyleVariant,
	isChildStyle,
	isPureStyle,

	mapPropsToStyleNames,
	flattenStyle,
	mergeStyle,
	getConcreteStyle,

	getMarginTop,
	getMarginRight,
	getMarginBottom,
	getMarginLeft,
}

const connectStyle = require("./connectStyle")
exports.connectStyle = (Component, styleName) => connectStyle(styleName || Component.name, {}, mapPropsToStyleNames)(Component)
exports.clearThemeCache = connectStyle.clearThemeCache

// Prepair Default Theme

const elementStylez = require("/styles/elements")
let defaultStyle = require("/styles/themes/light")
if (typeof defaultStyle === FUNCTION) defaultStyle = defaultStyle()
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

/**
 * Sets the given style as a default theme style.
 */
let defaultTheme = new Theme(_theme)

const { globalStore } = require("/hooks")
const { debug } = require("react-native-reanimated")

globalStore.set("theme", defaultTheme, { persist: true })
