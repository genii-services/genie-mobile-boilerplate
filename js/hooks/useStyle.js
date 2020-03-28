const $NAME = "StyleCoordinator"
console.debug($NAME)

const React = require("react")
const { useState } = React
const { StyleSheet } = require("react-native")
const { setCustomText, setCustomTextInput } = require("react-native-global-props")

const { FUNCTION, OBJECT, STRING } = require("/constants")
const { assign, getName, parseJson } = require("/utils")
const storage = require("/interactors/storage")
const { TRANSPARENT, fontFamily, fontSizesArray, colors, grayscaleColors, backgroundColors } = require("/styles")

const [useStyle, Provider] = createCtx()

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

const StyleProvider = ({ children }) => {
	const [_fontSizesIndex, set_FontSizesIndex] = useState(fontSizesIndex)
	const value = {
		getStyle,
		_fontSizesIndex,
		setFontFamily,
		setFontSizesIndex,
	}
	return <Provider value={value}>{children}</Provider>
}

const StyleCoordinator = ({ children }) => {
	const { set_FontSizesIndex } = useStyle()

	storage.load($NAME, data => {
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
		set_FontSizesIndex(i)
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

	const value = {
		getStyle,
		fontSizesIndex,
		setFontFamily,
		setFontSizesIndex,
	}
	return <children />
}

module.exports = {
	StyleCoordinator,
	StyleProvider,
	useStyle,
}
