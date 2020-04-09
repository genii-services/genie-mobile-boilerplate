/** 공통 라이브러리 */
const MODULE_NAME$ = "styles/themes/material"
console.debug(MODULE_NAME$)

const color = require("color")
const { PixelRatio } = require("react-native")

const styleConstantz = require("/constants/style")
const { BLACK, CENTER, MATERIAL, TRANSPARENT, WHITE } = styleConstantz
const { itsIOS } = require("/utils/device")

// COLORS

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

const grayscaleColorz = {
	"-5": WHITE,
	"-4": "#cccccc",
	"-3": "#c0c0c0",
	"-2": "#adadad",
	"-1": "#9b9b9b",
	"+0": "#808080",
	"+1": "#6f6f6f",
	"+2": "#4a4a4a",
	"+3": "#2f2f2f",
	"+4": BLACK,
}
const backgroundColorz = {
	"-3": TRANSPARENT,
	"-2": "#134a7a",
	"-1": "#3e83be",
	"+1": "#4082BF",
	"+2": "#eeeeee",
	"+3": WHITE,
}

// LAYOUTS

const textAlign = CENTER

const fontFamily = "System"
const colors = [WHITE, "#F1F9FF", "#BCB0BD", "#7F747D", "#46494B", "#26292B", BLACK]

const textColor = BLACK
const inverseTextColor = WHITE

const brandPrimary = "#3F51B5"
const brandInfo = "#62B1F6"
const brandSuccess = "#5cb85c"
const brandDanger = "#d9534f"
const brandWarning = "#f0ad4e"

const toolbarDefaultBg = brandPrimary
const tabBgColor = "#F8F8F8"

const fontSizesArray = [
	[6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 20, 24, 25], // 작게
	[7, 8, 10, 12, 13, 14, 15, 16, 17, 20, 24, 25, 30], // 조금 작게
	[8, 10, 12, 13, 14, 15, 16, 17, 20, 24, 25, 30, 32], // 표준
	[10, 12, 13, 14, 15, 16, 17, 20, 24, 25, 30, 32, 34], // 조금 크게
	[12, 13, 14, 15, 16, 17, 20, 24, 25, 30, 32, 34, 36], // 크게
]
const fontSize = 15
const iconSize = 28

module.exports = {
	...styleConstantz,

	name: MATERIAL,

	itsUnitedStyle: true,

	fontFamily,
	fontSizesArray,
	colors,
	grayscaleColors,
	backgroundColors,

	// label & placeholder
	placeholderTextColor: "#575757",

	// ActionSheet
	elevation: 4,
	listItemHeight: 50,
	marginHorizontal: -15,
	marginLeft: 14,
	marginTop: 15,
	minHeight: 56,
	padding: 15,

	// Android
	androidRipple: true,
	androidRippleColor: "rgba(256, 256, 256, 0.3)",
	androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
	buttonUppercaseAndroidText: true,

	// Badge
	badgeBg: "#ED1727",
	badgeColor: WHITE,
	badgePadding: 0,

	// Button
	buttonFontFamily: fontFamily,
	buttonDisabledBg: "#b5b5b5",
	buttonPadding: 6,
	buttonPrimaryBg: brandPrimary,
	buttonInfoBg: brandInfo,
	buttonInfoColor: inverseTextColor,
	buttonSuccessBg: brandSuccess,
	buttonDangerBg: brandDanger,
	buttonWarningBg: brandWarning,
	buttonTextSize: fontSize - 1,
	borderRadiusLarge: fontSize * 3.8,

	// Card
	cardDefaultBg: WHITE,
	cardBorderColor: "#ccc",
	cardBorderRadius: 2,
	cardItemPadding: itsIOS ? 10 : 12,

	// CheckBox
	CheckboxRadius: 0,
	CheckboxBorderWidth: 2,
	CheckboxPaddingLeft: 2,
	CheckboxPaddingBottom: 5,
	CheckboxIconSize: 16,
	CheckboxIconMarginTop: 1,
	CheckboxFontSize: 17,
	checkboxBgColor: "#039BE5",
	checkboxSize: 20,
	checkboxTickColor: WHITE,

	// Color
	brandPrimary,
	brandInfo,
	brandSuccess,
	brandDanger,
	brandWarning,
	brandDark: BLACK,
	brandLight: "#f4f4f4",

	// Container
	containerBgColor: WHITE,

	// Date Picker
	datePickerTextColor: BLACK,
	datePickerBg: TRANSPARENT,

	// Font
	DefaultFontSize: 16,
	fontFamily,
	fontSize,
	fontSizeH1: fontSize * 1.8,
	fontSizeH2: fontSize * 1.6,
	fontSizeH3: fontSize * 1.4,

	// Footer
	footerHeight: 55,
	footerDefaultBg: brandPrimary,
	footerPaddingBottom: 0,

	// FooterTab
	tabBarTextColor: "#bfc6ea",
	tabBarTextSize: 11,
	activeTab: WHITE,
	sTabBarActiveTextColor: "#007aff",
	tabBarActiveTextColor: WHITE,
	tabActiveBgColor: brandPrimary,

	// Header
	toolbarBtnColor: WHITE,
	toolbarDefaultBg,
	toolbarHeight: 56,
	toolbarSearchIconSize: 23,
	toolbarInputColor: WHITE,
	searchBarHeight: itsIOS ? 30 : 40,
	searchBarInputHeight: itsIOS ? 40 : 50,
	toolbarBtnTextColor: WHITE,
	toolbarDefaultBorder: brandPrimary,
	iosStatusbar: "light-content",
	statusBarColor: color(toolbarDefaultBg).darken(0.2).hex(),
	darkenHeader: color(tabBgColor).darken(0.03).hex(),

	// Icon
	iconFamily: "Ionicons",
	iconSize,
	iconHeaderSize: 24,

	// InputGroup
	inputFontSize: 17,
	inputBorderColor: "#D9D5DC",
	inputSuccessBorderColor: "#2b8339",
	inputErrorBorderColor: "#ed2f2f",
	inputHeightBase: 50,
	inputColor: textColor,

	// Line Height
	buttonLineHeight: 19,
	lineHeightH1: 32,
	lineHeightH2: 27,
	lineHeightH3: 22,
	lineHeight: 24,

	// List
	listBg: TRANSPARENT,
	listBorderColor: "#c9c9c9",
	listDividerBg: "#f4f4f4",
	listBtnUnderlayColor: "#DDD",
	listItemPadding: 12,
	listNoteColor: "#808080",
	listNoteSize: 13,
	listItemSelected: brandPrimary,

	// Progress Bar
	defaultProgressColor: "#E4202D",
	inverseProgressColor: "#1A191B",

	// Radio Button
	radioBtnSize: 23,
	radioSelectedColorAndroid: brandPrimary,
	radioBtnLineHeight: 24,
	radioColor: brandPrimary,

	// Segment
	segmentBackgroundColor: brandPrimary,
	segmentActiveBackgroundColor: WHITE,
	segmentTextColor: WHITE,
	segmentActiveTextColor: brandPrimary,
	segmentBorderColor: WHITE,
	segmentBorderColorMain: brandPrimary,

	// Spinner
	defaultSpinnerColor: "#45D56E",
	inverseSpinnerColor: "#1A191B",

	// Tab
	tabDefaultBg: brandPrimary,
	topTabBarTextColor: "#b3c7f9",
	topTabBarActiveTextColor: WHITE,
	topTabBarBorderColor: WHITE,
	topTabBarActiveBorderColor: WHITE,

	// Tabs
	tabBgColor,
	tabFontSize: 15,

	// Text
	textColor: BLACK,
	inverseTextColor,
	noteFontSize: 14,
	defaultTextColor: textColor,

	// Title
	titleFontfamily: fontFamily,
	titleFontSize: 19,
	subTitleFontSize: 14,
	subtitleColor: WHITE,
	titleFontColor: WHITE,

	// Other
	borderRadiusBase: 2,
	borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
	contentPadding: 10,
	dropdownLinkColor: "#414142",
	inputLineHeight: 24,

	inputGroupRoundedBorderRadius: 30,

	// iPhoneX SafeArea
	Inset: {
		portrait: {
			topInset: 24,
			leftInset: 0,
			rightInset: 0,
			bottomInset: 34,
		},
		landscape: {
			topInset: 0,
			leftInset: 44,
			rightInset: 44,
			bottomInset: 21,
		},
	},
}
