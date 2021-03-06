/** old common */
const MODULE_NAME$ = "styles/themes/dark"
console.debug(MODULE_NAME$)

const color = require("color")
const { PixelRatio } = require("react-native")

const styleConstantz = require("/constants/style")
const { BLACK, CENTER, TRANSPARENT, WHITE } = styleConstantz
const { itsIOS } = require("/utils/device")

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

fontFamily = itsIOS ? "System" : "Roboto"

// LAYOUTS

const textAlign = CENTER

const brandPrimary = itsIOS ? "#007aff" : "#3F51B5"
const brandInfo = "#62B1F6"
const brandSuccess = "#5cb85c"
const brandDanger = "#d9534f"
const brandWarning = "#f0ad4e"

const inverseTextColor = WHITE

const toolbarDefaultBg = itsIOS ? "#F8F8F8" : "#3F51B5"
const tabBgColor = "#F8F8F8"
const textColor = BLACK

const fontSizesArray = [
	[6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 20, 24, 25], // 작게
	[7, 8, 10, 12, 13, 14, 15, 16, 17, 20, 24, 25, 30], // 조금 작게
	[8, 10, 12, 13, 14, 15, 16, 17, 20, 24, 25, 30, 32], // 표준
	[10, 12, 13, 14, 15, 16, 17, 20, 24, 25, 30, 32, 34], // 조금 크게
	[12, 13, 14, 15, 16, 17, 20, 24, 25, 30, 32, 34, 36], // 크게
]

const fontSize = 15
const iconSize = itsIOS ? 30 : 28

module.exports = {
	...styleConstantz,

	name: "dark",

	fontFamily,
	fontSizesArray,
	colors,
	grayscaleColors,
	backgroundColors,

	// label & placeholder
	placeholderTextColor: "#575757",

	// ActionSheet
	elevation: 4,
	marginLeft: 14,

	// Android
	androidRipple: true,
	androidRippleColor: "rgba(256, 256, 256, 0.3)",
	androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
	buttonUppercaseAndroidText: true,

	// Badge
	badgeBg: "#ED1727",
	badgeColor: WHITE,
	badgePadding: itsIOS ? 3 : 0,

	// Button
	buttonFontFamily: itsIOS ? "System" : "Roboto_medium",
	buttonDisabledBg: "#b5b5b5",
	buttonPadding: 6,
	buttonPrimaryBg: brandPrimary,
	buttonInfoBg: brandInfo,
	buttonInfoColor: inverseTextColor,
	buttonSuccessBg: brandSuccess,
	buttonDangerBg: brandDanger,
	buttonWarningBg: brandWarning,
	buttonTextSize: itsIOS ? fontSize * 1.1 : fontSize - 1,
	borderRadiusLarge: fontSize * 3.8,

	// Card
	cardDefaultBg: WHITE,
	cardBorderColor: "#ccc",
	cardBorderRadius: 2,
	cardItemPadding: itsIOS ? 10 : 12,

	// CheckBox
	CheckboxRadius: itsIOS ? 13 : 0,
	CheckboxBorderWidth: itsIOS ? 1 : 2,
	CheckboxPaddingLeft: itsIOS ? 4 : 2,
	CheckboxPaddingBottom: itsIOS ? 0 : 5,
	CheckboxIconSize: itsIOS ? 21 : 16,
	CheckboxIconMarginTop: itsIOS ? undefined : 1,
	CheckboxFontSize: itsIOS ? 23 / 0.9 : 17,
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
	fontSizez: {
		"-4": parseInt(fontSize * 0.6),
		"-3": parseInt(fontSize * 0.7),
		"-2": parseInt(fontSize * 0.8),
		"-1": parseInt(fontSize * 0.9),
		"0": fontSize,
		"+1": fontSize * 1.2,
		"+2": fontSize * 1.4,
		"+3": fontSize * 1.6,
		"+4": fontSize * 1.8,
	},

	// Footer
	footerHeight: 55,
	footerDefaultBg: itsIOS ? "#F8F8F8" : "#3F51B5",
	footerPaddingBottom: 0,

	// FooterTab
	tabBarTextColor: itsIOS ? "#737373" : "#bfc6ea",
	tabBarTextSize: itsIOS ? 14 : 11,
	activeTab: itsIOS ? "#007aff" : WHITE,
	sTabBarActiveTextColor: "#007aff",
	tabBarActiveTextColor: itsIOS ? "#2874F0" : WHITE,
	tabActiveBgColor: itsIOS ? "#cde1f9" : "#3F51B5",

	// Header
	toolbarBtnColor: itsIOS ? "#007aff" : WHITE,
	toolbarDefaultBg,
	toolbarHeight: itsIOS ? 64 : 56,
	toolbarSearchIconSize: itsIOS ? 20 : 23,
	toolbarInputColor: itsIOS ? "#CECDD2" : WHITE,
	searchBarHeight: itsIOS ? 30 : 40,
	searchBarInputHeight: itsIOS ? 30 : 50,
	toolbarBtnTextColor: itsIOS ? "#007aff" : WHITE,
	iosStatusbar: "dark-content",
	toolbarDefaultBorder: itsIOS ? "#a7a6ab" : "#3F51B5",
	statusBarColor: color(toolbarDefaultBg).darken(0.2).hex(),
	darkenHeader: color(tabBgColor).darken(0.03).hex(),

	// Icon
	iconFamily: "Ionicons",
	iconSize,
	iconHeaderSize: itsIOS ? 33 : 24,

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
	lineHeight: itsIOS ? 20 : 24,

	// List
	listBg: TRANSPARENT,
	listBorderColor: "#c9c9c9",
	listDividerBg: "#f4f4f4",
	listBtnUnderlayColor: "#DDD",
	listItemPadding: itsIOS ? 10 : 12,
	listNoteColor: "#808080",
	listNoteSize: 13,
	listItemSelected: itsIOS ? "#007aff" : "#3F51B5",

	// Progress Bar
	defaultProgressColor: "#E4202D",
	inverseProgressColor: "#1A191B",

	// Radio Button
	radioBtnSize: itsIOS ? 25 : 23,
	radioSelectedColorAndroid: "#3F51B5",
	radioBtnLineHeight: itsIOS ? 29 : 24,
	radioColor: brandPrimary,

	// Segment
	segmentBackgroundColor: itsIOS ? "#F8F8F8" : "#3F51B5",
	segmentActiveBackgroundColor: itsIOS ? "#007aff" : WHITE,
	segmentTextColor: itsIOS ? "#007aff" : WHITE,
	segmentActiveTextColor: itsIOS ? WHITE : "#3F51B5",
	segmentBorderColor: itsIOS ? "#007aff" : WHITE,
	segmentBorderColorMain: itsIOS ? "#a7a6ab" : "#3F51B5",

	// Spinner
	defaultSpinnerColor: "#45D56E",
	inverseSpinnerColor: "#1A191B",

	// Tab
	tabDefaultBg: itsIOS ? "#F8F8F8" : "#3F51B5",
	topTabBarTextColor: itsIOS ? "#6b6b6b" : "#b3c7f9",
	topTabBarActiveTextColor: itsIOS ? "#007aff" : WHITE,
	topTabBarBorderColor: itsIOS ? "#a7a6ab" : WHITE,
	topTabBarActiveBorderColor: itsIOS ? "#007aff" : WHITE,

	// Tabs
	tabBgColor,
	tabFontSize: 15,

	// Text
	textColor,
	inverseTextColor,
	noteFontSize: 14,
	defaultTextColor: textColor,

	// Title
	titleFontfamily: itsIOS ? "System" : "Roboto_medium",
	titleFontSize: itsIOS ? 17 : 19,
	subTitleFontSize: itsIOS ? 11 : 14,
	subtitleColor: itsIOS ? WHITE : BLACK,
	titleFontColor: itsIOS ? WHITE : BLACK,

	// Other
	borderRadiusBase: itsIOS ? 5 : 2,
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
