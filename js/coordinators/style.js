const $MODULE_NAME = "StyleCoordinator"
console.debug($MODULE_NAME)

const _ = require("lodash")
const { StyleSheet } = require("react-native")
const { setCustomText, setCustomTextInput } = require("react-native-global-props")

const { FUNCTION, OBJECT, STRING } = require("/constants")
const { TRANSPARENT } = require("/constants/style")
const { isEqual } = require("/utils/object")
const { globalStore, useState, useStore, useThis } = require("/hooks")
const { assign, getName, parseJson } = require("/utils")
// const storage = require("/interactors/storage")

// 초기값

globalStore.set("globalStyle", { defaultTheme: "lightTheme", fontSizesIndex: 2 }, { persist: true })

// 캐싱한 스타일
let styleCachez = {}
let styleConditionz = {}

const useStyle = (target, conditionz, initialStyle) => {
	const [globalStyle, setGlobalStyle] = useStore("globalStyle")

	const _this = useThis(() => {
		resetStyle()
	})

	function resetStyle(style = {}) {
		console.debug(this, "resetStyle")

		_.assign(style, globalStyle)
		const { defaultTheme, fontFamily, fontSizes } = style
		setGlobalStyle(style)

		styleCachez = {}
		styleCachez.defaultStyle = style
		_.forEach(require("styles/themes"), (v, k) => (styleCachez[k + "Theme"] = typeof v === FUNCTION ? v(style) : v))
		const theme = (styleCachez.defaultTheme = styleCachez[defaultTheme])
		_.forEach(require("styles/elements"), (v, k) => (styleCachez[k + "Element"] = typeof v === FUNCTION ? v(theme) : v))
		_.forEach(require("styles/viewparts"), (v, k) => (styleCachez[k + "Viewpart"] = typeof v === FUNCTION ? v(theme) : v))
		_.forEach(require("styles/screens"), (v, k) => (styleCachez[k + "Screen"] = typeof v === FUNCTION ? v(theme) : v))

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
		let stylez = isEqual(styleConditionz[name], conditionz) && styleCachez[name]
		if (stylez) return stylez

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
				initialStyle = initialStyle(styleCachez.defaultTheme)
				break
			case STRING:
				initialStyle = parseJson(initialStyle)
				break
			default:
				initialStyle = {}
		}

		styleConditionz[name] = conditionz
		stylez = styleCachez[name] = StyleSheet.create(style)
		return stylez
	}

	const setFontFamily = (fontFamily) => {
		resetStyle({ fontFamily })
	}

	const setFontSizesIndex = (i) => {
		resetStyle({ fontSizesIndex: i })
	}

	const stylez = target ? getStylez(target, conditionz, initialStyle) : styleCachez.defaultTheme

	return {
		getStylez,
		resetStyle,
		setFontFamily,
		setFontSizesIndex,
		stylez,
	}
}

module.exports = {
	useStyle,
}
