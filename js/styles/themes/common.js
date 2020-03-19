/** 공통 라이브러리 */
const color = require("color")
const { PixelRatio } = require("react-native")

const { deviceOS, itsIOS } = require("/utils/device")
const platformStyle = undefined

const brandPrimary = itsIOS ? "#007aff" : "#3F51B5"
const brandInfo = "#62B1F6"
const brandSuccess = "#5cb85c"
const brandDanger = "#d9534f"
const brandWarning = "#f0ad4e"

const inverseTextColor = "#fff"

const toolbarDefaultBg = itsIOS ? "#F8F8F8" : "#3F51B5"
const tabBgColor = "#F8F8F8"
const textColor = "#000"

const fontSizeBase = 15
const iconFontSize = itsIOS ? 30 : 28

module.exports = {
	platformStyle,
	platform: deviceOS,

	// Accordion
	headerStyle: "#edebed",
	iconStyle: "#000",
	contentStyle: "#f5f4f5",
	expandedIconStyle: "#000",
	accordionBorderColor: "#d3d3d3",

	// ActionSheet
	elevation: 4,
	containerTouchableBackgroundColor: "rgba(0,0,0,0.4)",
	innerTouchableBackgroundColor: "#fff",
	listItemHeight: 50,
	listItemBorderColor: "transparent",
	marginHorizontal: -15,
	marginLeft: 14,
	marginTop: 15,
	minHeight: 56,
	padding: 15,
	touchableTextColor: "#757575",

	// Android
	androidRipple: true,
	androidRippleColor: "rgba(256, 256, 256, 0.3)",
	androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
	buttonUppercaseAndroidText: true,

	// Badge
	badgeBg: "#ED1727",
	badgeColor: "#fff",
	badgePadding: itsIOS ? 3 : 0,

	// Button
	buttonFontFamily: itsIOS ? "System" : "Roboto_medium",
	buttonDisabledBg: "#b5b5b5",
	buttonPadding: 6,
	buttonPrimaryBg: brandPrimary,
	buttonPrimaryColor: inverseTextColor,
	buttonInfoBg: brandInfo,
	buttonInfoColor: inverseTextColor,
	buttonSuccessBg: brandSuccess,
	buttonSuccessColor: inverseTextColor,
	buttonDangerBg: brandDanger,
	buttonDangerColor: inverseTextColor,
	buttonWarningBg: brandWarning,
	buttonWarningColor: inverseTextColor,
	buttonTextSize: itsIOS ? fontSizeBase * 1.1 : fontSizeBase - 1,
	buttonTextSizeLarge: fontSizeBase * 1.5,
	buttonTextSizeSmall: fontSizeBase * 0.8,
	borderRadiusLarge: fontSizeBase * 3.8,
	iconSizeLarge: iconFontSize * 1.5,
	iconSizeSmall: iconFontSize * 0.6,

	// Card
	cardDefaultBg: "#fff",
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
	checkboxTickColor: "#fff",

	// Color
	brandPrimary,
	brandInfo,
	brandSuccess,
	brandDanger,
	brandWarning,
	brandDark: "#000",
	brandLight: "#f4f4f4",

	// Container
	containerBgColor: "#fff",

	// Date Picker
	datePickerTextColor: "#000",
	datePickerBg: "transparent",

	// FAB
	fabWidth: 56,

	// Font
	DefaultFontSize: 16,
	fontFamily: itsIOS ? "System" : "Roboto",
	fontSizeBase,
	fontSizeH1: fontSizeBase * 1.8,
	fontSizeH2: fontSizeBase * 1.6,
	fontSizeH3: fontSizeBase * 1.4,

	// Footer
	footerHeight: 55,
	footerDefaultBg: itsIOS ? "#F8F8F8" : "#3F51B5",
	footerPaddingBottom: 0,

	// FooterTab
	tabBarTextColor: itsIOS ? "#737373" : "#bfc6ea",
	tabBarTextSize: itsIOS ? 14 : 11,
	activeTab: itsIOS ? "#007aff" : "#fff",
	sTabBarActiveTextColor: "#007aff",
	tabBarActiveTextColor: itsIOS ? "#2874F0" : "#fff",
	tabActiveBgColor: itsIOS ? "#cde1f9" : "#3F51B5",

	// Header
	toolbarBtnColor: itsIOS ? "#007aff" : "#fff",
	toolbarDefaultBg,
	toolbarHeight: itsIOS ? 64 : 56,
	toolbarSearchIconSize: itsIOS ? 20 : 23,
	toolbarInputColor: itsIOS ? "#CECDD2" : "#fff",
	searchBarHeight: itsIOS ? 30 : 40,
	searchBarInputHeight: itsIOS ? 30 : 50,
	toolbarBtnTextColor: itsIOS ? "#007aff" : "#fff",
	iosStatusbar: "dark-content",
	toolbarDefaultBorder: itsIOS ? "#a7a6ab" : "#3F51B5",
	statusBarColor: color(toolbarDefaultBg)
		.darken(0.2)
		.hex(),
	darkenHeader: color(tabBgColor)
		.darken(0.03)
		.hex(),

	// Icon
	iconFamily: "Ionicons",
	iconFontSize,
	iconHeaderSize: itsIOS ? 33 : 24,

	// InputGroup
	inputFontSize: 17,
	inputBorderColor: "#D9D5DC",
	inputSuccessBorderColor: "#2b8339",
	inputErrorBorderColor: "#ed2f2f",
	inputHeightBase: 50,
	inputColor: textColor,
	inputColorPlaceholder: "#575757",

	// Line Height
	buttonLineHeight: 19,
	lineHeightH1: 32,
	lineHeightH2: 27,
	lineHeightH3: 22,
	lineHeight: itsIOS ? 20 : 24,

	// List
	listBg: "transparent",
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
	segmentActiveBackgroundColor: itsIOS ? "#007aff" : "#fff",
	segmentTextColor: itsIOS ? "#007aff" : "#fff",
	segmentActiveTextColor: itsIOS ? "#fff" : "#3F51B5",
	segmentBorderColor: itsIOS ? "#007aff" : "#fff",
	segmentBorderColorMain: itsIOS ? "#a7a6ab" : "#3F51B5",

	// Spinner
	defaultSpinnerColor: "#45D56E",
	inverseSpinnerColor: "#1A191B",

	// Tab
	tabDefaultBg: itsIOS ? "#F8F8F8" : "#3F51B5",
	topTabBarTextColor: itsIOS ? "#6b6b6b" : "#b3c7f9",
	topTabBarActiveTextColor: itsIOS ? "#007aff" : "#fff",
	topTabBarBorderColor: itsIOS ? "#a7a6ab" : "#fff",
	topTabBarActiveBorderColor: itsIOS ? "#007aff" : "#fff",

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
	subtitleColor: itsIOS ? "#000" : "#fff",
	titleFontColor: itsIOS ? "#000" : "#fff",

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
