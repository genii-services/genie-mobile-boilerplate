/** 공통 라이브러리 */
console.debug("styles")

const connectStyle = require("./connectStyle")
const { clearThemeCache } = connectStyle
const { INCLUDE } = require("./resolveIncludes")
const StyleProvider = require("./StyleProvider")
const Theme = require("./Theme")
const { ThemeShape } = Theme
const { createVariations, createSharedStyle } = require("./addons")

const { StyleSheet } = require("react-native")

const { itsIOS, screen } = require("/utils/device")
const { TRANSPARENT, WHITE, BLACK, CENTER } = require("/constants/style")

// COLORS

const colors = ["#b8cde3", "#b5cde4", "#755307", "#4082BF", "#3e83be", "#1f84da"]
const grayscaleColors = [
	WHITE,
	"#cccccc",
	"#c0c0c0",
	"#adadad",
	"#a3a3a3",
	"#9b9b9b",
	"#808080",
	"#6f6f6f",
	"#4a4a4a",
	"#2f2f2f",
	BLACK,
]
const backgroundColors = [TRANSPARENT, "#134a7a", "#3e83be", "#4082BF", "#eeeeee", WHITE]

// FONTS

const fontFamily = itsIOS ? "HelveticaNeue" : "System"
const fontSizesArray = [
	[6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 20, 24, 25], // 작게
	[7, 8, 10, 12, 13, 14, 15, 16, 17, 20, 24, 25, 30], // 조금 작게
	[8, 10, 12, 13, 14, 15, 16, 17, 20, 24, 25, 30, 32], // 표준
	[10, 12, 13, 14, 15, 16, 17, 20, 24, 25, 30, 32, 34], // 조금 크게
	[12, 13, 14, 15, 16, 17, 20, 24, 25, 30, 32, 34, 36], // 크게
]

// LAYOUTS

const textAlign = CENTER

const W50PC = screen.min / 2

module.exports = {
	StyleSheet,
	screen,
	fontFamily,
	backgroundColors,
	colors,
	grayscaleColors,
	fontSizesArray,
	textAlign,
	W50PC,

	connectStyle,
	clearThemeCache,
	INCLUDE,
	StyleProvider,
	Theme,
	ThemeShape,
	createVariations,
	createSharedStyle,
}
