const $MODULE_NAME = "StyleCoordinator"
console.debug($MODULE_NAME)

const _ = require("lodash")
const React = require("react")
const { StyleSheet } = require("react-native")
const { setCustomText, setCustomTextInput } = require("react-native-global-props")

const { FUNCTION, OBJECT, STRING } = require("/constants")
const { BLACK, CENTER, TRANSPARENT, WHITE } = require("/constants/style")
const { isEqual } = require("/utils/object")
const { globalStore, useState, useStore } = require("/hooks")
const { assign, getName, parseJson } = require("/utils")
const storage = require("/interactors/storage")

// 초기값

const themez = _.mapValues(require("/styles/themes"), (v) => (typeof v === FUNCTION ? v() : v))
const defaultTheme = themez.light
const { fontFamily, fontSizesArray, colors, grayscaleColors, backgroundColors } = defaultTheme

const fontSizesIndex = 2
const fontSizes = fontSizesArray[fontSizesIndex]
const stylez = {
	colors,
	grayscaleColors,
	backgroundColors,
	fontSizesIndex,
	fontSizes,

	customText: {
		style: {
			fontFamily,
			fontSize: fontSizes[5],
		},
	},
	customTextInput: {
		style: {
			fontFamily,
			paddingTop: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0,
		},
		underlineColorAndroid: TRANSPARENT,
	},
}

// 캐싱한 스타일
const styleConditionz = {}
const styleCachez = {}

const useStyle = (target, conditionz, initialStyle) => {
	const [store, setStore] = useStore("style")
	if (store) return

	const value = {
		getStyle,
		setFontFamily,
		setFontSizesIndex,
	}

	storage.load($MODULE_NAME, (data) => {
		assign(stylez, data)
		setFontSizesIndex(stylez.fontSizesIndex)
	})

	const resetCache = () => (styleCachez = {})

	const setFontFamily = (fontFamily) => {
		stylez.fontFamily = fontFamily
		let { customText, customTextInput } = stylez
		customText.style.fontFamily = fontFamily
		customTextInput.style.fontFamily = fontFamily
		setCustomText(customText)
		setCustomTextInput(customTextInput)
		resetCache()
	}

	const setFontSizesIndex = (i) => {
		store.fontSizesIndex = i
		stylez.fontSizes = fontSizesArray[i]
		let { customText } = stylez
		customText.style.fontSize = fontSizesfontSizes[5]
		setCustomText(customText)
		resetCache()
	}

	const getStyle = (target, conditionz, initialStyle) => {
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
				target.styles

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

		styleConditionz[name] = conditionz
		stylez = styleCachez[name] = StyleSheet.create(style)
		return stylez
	}

	const stylez = target ? getStyle(target, conditionz, initialStyle) : stylez

	return {
		stylez,
		getStyle,
		fontSizesIndex,
		setFontFamily,
		setFontSizesIndex,
	}
}

module.exports = {
	useStyle,
}
