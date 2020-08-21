const $MODULE_NAME = "StyleCoordinator"
console.debug($MODULE_NAME)

const _ = require("lodash")
const { StyleSheet } = require("react-native")
const { setCustomText, setCustomTextInput } = require("react-native-global-props")

const { FUNCTION, OBJECT, STRING } = require("/constants")
const { TRANSPARENT } = require("/constants/style")
const { isEqual } = require("/utils/object")
const { globalStore, useState, useStore } = require("/hooks")
const { assign, getName, parseJson } = require("/utils")
const { isStyleVariant, isChildStyle, isPureStyle } = require("/utils/style")
// const storage = require("/interactors/storage")

// 초기값
globalStore.set("globalStyle", { defaultThemeName: "lightTheme", fontSizesIndex: 2 }, { persist: true })

// 캐싱한 스타일
let cachedStylez
let styleConditionz = {}

const getCachingStyle = (style, initial) => {
	if (typeof style === FUNCTION) style = style(initial)
	const purez = {},
		varientz = {},
		children = {}
	_.forEach(style, (v, k) => {
		if (isStyleVariant(k)) varientz[k] = v
		else if (isChildStyle(k)) children[k] = v
		else purez[k] = v
	})
	return { purez, varientz, children }
}

const useStyle = (target, conditionz, initialStyle) => {
	const [globalStyle, setGlobalStyle] = useStore("globalStyle")

	const resetStylez = (style = {}) => {
		console.debug(this, "resetStylez", target)

		_.assign(style, globalStyle)
		setGlobalStyle(style)

		cachedStylez = {}
		cachedStylez.defaultStyle = style
		_.forEach(require("styles/themes"), (v, k) => (cachedStylez[k + "Theme"] = getCachingStyle(v, style)))
		const theme = (cachedStylez.defaultTheme = cachedStylez[style.defaultThemeName])
		_.forEach(require("styles/elements"), (v, k) => (cachedStylez[k + "Element"] = getCachingStyle(v, theme)))
		_.forEach(require("styles/viewparts"), (v, k) => (cachedStylez[k + "Viewpart"] = getCachingStyle(v, theme)))
		_.forEach(require("styles/screens"), (v, k) => (cachedStylez[k + "Screen"] = getCachingStyle(v, theme)))

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
		stylez = _.assign({}, purez, initialStyle)
		const _conditionz = { ...conditionz }
		_.forEach(_conditionz, (v, k) => {
			const varient = varientz["." + k]
			if (varient) {
				_.assign(stylez, varient)
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
				initialStyle = initialStyle(defaultTheme)
				break
			case STRING:
				initialStyle = parseJson(initialStyle)
				break
			default:
				initialStyle = {}
		}
		_.assign(stylez, purez, initialStyle)
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
