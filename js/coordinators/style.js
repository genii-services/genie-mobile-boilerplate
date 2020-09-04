const $MODULE_NAME = "StyleCoordinator"
console.debug($MODULE_NAME)

const { assign, forEach } = require("lodash")
const { StyleSheet } = require("react-native")
const { setCustomText, setCustomTextInput } = require("react-native-global-props")

const { FUNCTION, OBJECT, STRING } = require("/constants")
const { TRANSPARENT } = require("/constants/style")
const { isEqual } = require("/utils/object")
const { globalStore, useState, useStore } = require("/hooks")
const { getName, parseJson } = require("/utils")
const { isStyleVariant, isChildStyle, isPureStyle } = require("/utils/style")

// 초기값
globalStore.set("globalStyle", { defaultThemeName: "lightTheme", fontSizesIndex: 2 }, { persist: true })

// 캐싱한 스타일
let cachedStylez
let styleConditionz = {}

const putCachedStyle = (key, style, initial) => {
	if (typeof style === FUNCTION && initial) style = Function.callSafely(style, initial.purez || initial)
	const purez = {},
		varientz = {},
		children = {}
	forEach(style, (v, k) => {
		if (isStyleVariant(k)) varientz[k] = v
		else if (isChildStyle(k)) children[k] = v
		else purez[k] = v
	})
	cachedStylez[key] = { purez, varientz, children }
}

const putCachedStyles = (collection, type, initial) => {
	forEach(collection, (v, k) => putCachedStyle([k + type], v, initial))
}

const useStyle = (target, conditionz, initialStyle) => {
	console.debug(this, "in", arguments.callee.caller?.name || target?.name)
	const [globalStyle, setGlobalStyle] = useStore("globalStyle")

	const resetStylez = (style = {}) => {
		console.debug(this, "resetStylez", target)

		assign(style, globalStyle)
		setGlobalStyle(style)

		cachedStylez = {}
		cachedStylez.defaultStyle = style
		putCachedStyles(require("styles/themes"), "Theme", style)

		const theme = (cachedStylez.defaultTheme = cachedStylez[style.defaultThemeName])
		putCachedStyles(require("styles/elements"), "Element", theme)
		putCachedStyles(require("styles/viewparts"), "Viewpart", theme)
		putCachedStyles(require("styles/screens"), "Screen", theme)

		setCustomText({
			style: {
				fontFamily: theme.fontFamily,
				fontSize: theme.fontSizes[5],
			},
		})
		setCustomTextInput({
			style: {
				fontFamily: theme.fontFamily,
				paddingTop: 0,
				paddingBottom: 0,
				paddingLeft: 0,
				paddingRight: 0,
			},
			underlineColorAndroid: TRANSPARENT,
		})
	}

	const getStylez = (target, conditionz, initialStyle) => {
		const name = getName(target)
		let stylez = isEqual(styleConditionz[name], conditionz) && cachedStylez[name]
		if (stylez) return stylez

		const { purez = {}, varientz = {}, children = {} } = cachedStylez[name] || {}
		stylez = assign({}, purez, initialStyle)
		const _conditionz = { ...conditionz }
		forEach(_conditionz, (v, k) => {
			const varient = varientz["." + k]
			if (varient) {
				assign(stylez, varient)
			}
		})
		styleConditionz[name] = conditionz

		if (!initialStyle)
			initialStyle =
				target.getDefaultStyle ||
				target.defaultStyle ||
				target.getDefaultStyle ||
				target.defaultStyles ||
				target.style ||
				target.styles2

		switch (typeof initialStyle) {
			case OBJECT:
				break
			case FUNCTION:
				initialStyle = Function.callSafely(initialStyle, defaultTheme)
				break
			case STRING:
				initialStyle = parseJson(initialStyle)
				break
			default:
				initialStyle = {}
		}
		assign(stylez, purez, initialStyle)
		cachedStylez[name] = stylez // StyleSheet.create(stylez)
		return stylez
	}

	const setFontFamily = (fontFamily) => {
		resetStylez({ fontFamily })
	}

	const setFontSizesIndex = (i) => {
		resetStylez({ fontSizesIndex: i })
	}

	if (!cachedStylez) resetStylez()
	const defaultTheme = cachedStylez.defaultTheme
	const stylez = target ? getStylez(target, conditionz, initialStyle) : defaultTheme

	return {
		getStylez,
		resetStylez,
		setFontFamily,
		setFontSizesIndex,
		stylez,
		defaultTheme,
	}
}

module.exports = {
	useStyle,
}
