const $MODULE_NAME = "StyleCoordinator"
console.debug($MODULE_NAME)

const React = require("react")
const { StyleSheet } = require("react-native")
const { setCustomText, setCustomTextInput } = require("react-native-global-props")

const { FUNCTION, OBJECT, STRING } = require("/constants")
const { globalStore, useState, useStore } = require("/hooks")
const { assign, getName, parseJson } = require("/utils")
const storage = require("/interactors/storage")
const { TRANSPARENT, fontFamily, fontSizesArray, colors, grayscaleColors, backgroundColors } = require("/styles")

// 초기값

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
const styleCachez = {}

const useStyle = () => {
	const [store, setStore] = useStore("style")
	if (store) return

	const value = {
		getStyle,
		setFontFamily,
		setFontSizesIndex,
	}

	storage.load($MODULE_NAME, data => {
		assign(stylez, data)
		setFontSizesIndex(stylez.fontSizesIndex)
	})

	const resetCache = () => (styleCachez = {})

	const setFontFamily = fontFamily => {
		stylez.fontFamily = fontFamily
		let { customText, customTextInput } = stylez
		customText.style.fontFamily = fontFamily
		customTextInput.style.fontFamily = fontFamily
		setCustomText(customText)
		setCustomTextInput(customTextInput)
		resetCache()
	}

	const setFontSizesIndex = i => {
		store.fontSizesIndex = i
		stylez.fontSizes = fontSizesArray[i]
		let { customText } = stylez
		customText.style.fontSize = fontSizesfontSizes[5]
		setCustomText(customText)
		resetCache()
	}

	const getStyle = (target, initialStyle) => {
		const name = getName(target)
		let style = styleCachez[name]
		if (!style) {
			if (!initialStyle)
				initialStyle =
					target.getDefaultStyle ||
					target.defaultStyle ||
					target.getDefaultStyle ||
					target.defaultStyles ||
					target.style ||
					target.styles

			switch (typeof initialStyle) {
				case FUNCTION:
					style = initialStyle(stylez)
					break
				case OBJECT:
					style = initialStyle
					break
				case STRING:
					style = parseJson(initialStyle)
					break
				default:
					style = {}
			}
			style = styleCachez[name] = StyleSheet.create(style)
		}
		return style
	}

	return {
		getStyle,
		fontSizesIndex,
		setFontFamily,
		setFontSizesIndex,
	}
}

module.exports = {
	useStyle,
}
