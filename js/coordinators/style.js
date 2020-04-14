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
// const storage = require("/interactors/storage")

// 초기값
globalStore.set("globalStyle", { defaultThemeName: "lightTheme", fontSizesIndex: 2 }, { persist: true })

// 캐싱한 스타일
let cachedStylez
let styleConditionz = {}

const useStyle = (target, conditionz, initialStyle) => {
	const [globalStyle, setGlobalStyle] = useStore("globalStyle")

	const resetStylez = (style = {}) => {
		console.debug(this, "resetStylez", target)

		_.assign(style, globalStyle)
		const { defaultThemeName, fontFamily, fontSizes } = style
		setGlobalStyle(style)

		cachedStylez = {}
		cachedStylez.defaultStyle = style
		_.forEach(require("styles/themes"), (v, k) => (cachedStylez[k + "Theme"] = typeof v === FUNCTION ? v(style) : v))
		const theme = (cachedStylez.defaultTheme = cachedStylez[defaultThemeName])
		_.forEach(require("styles/elements"), (v, k) => (cachedStylez[k + "Element"] = typeof v === FUNCTION ? v(theme) : v))
		_.forEach(require("styles/viewparts"), (v, k) => (cachedStylez[k + "Viewpart"] = typeof v === FUNCTION ? v(theme) : v))
		_.forEach(require("styles/screens"), (v, k) => (cachedStylez[k + "Screen"] = typeof v === FUNCTION ? v(theme) : v))

		setCustomText({
			style: {
				fontFamily,
				fontSize: fontSizes[5],
			},
		})
		setCustomTextInput({
			style: {
				fontFamily,
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
		stylez = _.assign({}, cachedStylez[name], initialStyle)
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
