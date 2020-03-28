/** Element Style */
const { PixelRatio, StatusBar } = require("react-native")

const { BLACK, CENTER, FLEX_START, FLEX_END, MATERIAL, ROW, TRANSPARENT } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")

module.exports = style => {
	const { itsUnitedStyle } = style
	const itsMaterial = style.name === MATERIAL
	const itsIOSStyle = itsIOS && !itsUnitedStyle
	return {
		".span": {
			height: 128,
			LeftElement: {
				alignSelf: FLEX_START,
			},
			BodyElement: {
				alignSelf: FLEX_END,
				alignItems: FLEX_START,
				justifyContent: CENTER,
				paddingBottom: 26,
			},
			RightElement: {
				alignSelf: FLEX_START,
			},
		},
		".hasSubtitle": {
			BodyElement: {
				TitleElement: {
					fontSize: style.titleFontSize - 2,
					fontFamily: style.titleFontfamily,
					textAlign: CENTER,
					fontWeight: "500",
					paddingBottom: 3,
				},
				SubtitleElement: {
					fontSize: style.subTitleFontSize,
					fontFamily: style.titleFontfamily,
					color: style.subtitleColor,
					textAlign: CENTER,
				},
			},
		},
		".transparent": {
			backgroundColor: TRANSPARENT,
			borderBottomColor: TRANSPARENT,
			elevation: 0,
			shadowColor: null,
			shadowOffset: null,
			shadowRadius: null,
			shadowOpacity: null,
			paddingTop: itsAndroid && StatusBar.currentHeight,
			height: itsAndroid ? style.toolbarHeight + StatusBar.currentHeight : style.toolbarHeight,
		},
		".noShadow": {
			elevation: 0,
			shadowColor: null,
			shadowOffset: null,
			shadowRadius: null,
			shadowOpacity: null,
		},
		".hasTabs": {
			elevation: 0,
			shadowColor: null,
			shadowOffset: null,
			shadowRadius: null,
			shadowOpacity: null,
			borderBottomWidth: null,
		},
		".hasSegment": {
			elevation: 0,
			shadowColor: null,
			shadowOffset: null,
			shadowRadius: null,
			shadowOpacity: null,
			borderBottomWidth: null,
			LeftElement: { flex: 0.3 },
			RightElement: { flex: 0.3 },
			BodyElement: {
				flex: 1,
				SegmentElement: {
					marginRight: 0,
					alignSelf: CENTER,
					ButtonElement: {
						paddingLeft: 0,
						paddingRight: 0,
					},
				},
			},
		},
		".noLeft": {
			LeftElement: {
				width: itsIOS ? undefined : 0,
				flex: itsIOS ? 1 : 0,
			},
			BodyElement: {
				TitleElement: {
					paddingLeft: itsIOS ? undefined : 10,
				},
				SubtitleElement: {
					paddingLeft: itsIOS ? undefined : 10,
				},
			},
		},
		ButtonElement: {
			justifyContent: CENTER,
			alignSelf: CENTER,
			alignItems: CENTER,
			".transparent": {
				TextElement: {
					color: style.toolbarBtnTextColor,
					fontWeight: "600",
				},
				IconElement: {
					color: style.toolbarBtnColor,
				},
				IconNBElement: {
					color: style.toolbarBtnColor,
				},
				paddingHorizontal: style.buttonPadding,
			},
			paddingHorizontal: 15,
		},
		".searchBar": {
			ItemElement: {
				IconElement: {
					backgroundColor: TRANSPARENT,
					color: style.dropdownLinkColor,
					fontSize: style.toolbarSearchIconSize,
					alignItems: CENTER,
					marginTop: 2,
					paddingRight: 10,
					paddingLeft: 10,
				},
				IconNBElement: {
					backgroundColor: TRANSPARENT,
					color: null,
					alignSelf: CENTER,
				},
				InputElement: {
					alignSelf: CENTER,
					lineHeight: null,
					height: style.searchBarInputHeight,
				},
				alignSelf: CENTER,
				alignItems: CENTER,
				justifyContent: FLEX_START,
				flex: 1,
				height: style.searchBarHeight,
				borderColor: TRANSPARENT,
				backgroundColor: style.toolbarInputColor,
			},
			ButtonElement: {
				".transparent": {
					TextElement: { fontWeight: "500" },
					paddingHorizontal: null,
					paddingLeft: itsIOS ? 10 : null,
				},
				paddingHorizontal: itsIOS ? undefined : null,
				width: itsIOS ? undefined : 0,
				height: itsIOS ? undefined : 0,
			},
		},
		".rounded": {
			ItemElement: {
				borderRadius: itsIOSStyle ? 25 : 3,
			},
		},
		LeftElement: {
			ButtonElement: {
				".hasText": {
					marginLeft: -10,
					height: 30,
					IconElement: {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize,
						marginTop: 2,
						marginRight: 5,
						marginLeft: 2,
					},
					TextElement: {
						color: style.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 0,
						marginLeft: 7,
						lineHeight: 19.5,
					},
					IconNBElement: {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize,
						marginTop: 2,
						marginRight: 5,
						marginLeft: 2,
					},
				},
				".transparent": {
					marginLeft: itsIOSStyle ? -3 : 0,
					IconElement: {
						color: style.toolbarBtnColor,
						fontSize: itsIOSStyle ? style.iconHeaderSize + 1 : style.iconHeaderSize,
						marginTop: 0,
						marginRight: 2,
						marginLeft: 1,
						paddingTop: 1,
					},
					IconNBElement: {
						color: style.toolbarBtnColor,
						fontSize: itsIOSStyle ? style.iconHeaderSize + 1 : style.iconHeaderSize - 2,
						marginTop: 0,
						marginRight: 2,
						marginLeft: 1,
						paddingTop: 1,
					},
					TextElement: {
						color: style.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 0,
						top: itsIOS ? 1 : -1.5,
						paddingLeft: itsIOSStyle ? 2 : 5,
						paddingRight: itsIOSStyle ? undefined : 10,
					},
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
				},
				IconElement: {
					color: style.toolbarBtnColor,
				},
				IconNBElement: {
					color: style.toolbarBtnColor,
				},
				alignSelf: null,
				paddingRight: style.buttonPadding,
				paddingLeft: itsIOSStyle ? 4 : 8,
			},
			flex: itsIOSStyle ? 1 : 0.4,
			alignSelf: CENTER,
			alignItems: FLEX_START,
		},
		BodyElement: {
			flex: 1,
			alignItems: itsIOSStyle ? CENTER : FLEX_START,
			alignSelf: CENTER,
			SegmentElement: {
				borderWidth: 0,
				alignSelf: FLEX_END,
				marginRight: itsIOS ? -40 : -55,
			},
			ButtonElement: {
				alignSelf: CENTER,
				".transparent": {
					backgroundColor: TRANSPARENT,
				},
				IconElement: {
					color: style.toolbarBtnColor,
				},
				IconNBElement: {
					color: style.toolbarBtnColor,
				},
				TextElement: {
					color: style.inverseTextColor,
					backgroundColor: TRANSPARENT,
				},
			},
		},
		RightElement: {
			ButtonElement: {
				".hasText": {
					height: 30,
					IconElement: {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize - 2,
						marginTop: 2,
						marginRight: 2,
						marginLeft: 5,
					},
					TextElement: {
						color: style.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 14,
						lineHeight: 19.5,
					},
					IconNBElement: {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize - 2,
						marginTop: 2,
						marginRight: 2,
						marginLeft: 5,
					},
				},
				".transparent": {
					marginRight: itsIOS ? -9 : -5,
					paddingLeft: 15,
					paddingRight: 12,
					paddingHorizontal: 15,
					borderRadius: 50,
					IconElement: {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize - 2,
						marginTop: 0,
						marginLeft: 2,
						marginRight: 0,
						// paddingTop: 0
					},
					IconNBElement: {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize - 2,
						marginTop: 0,
						marginLeft: 2,
						marginRight: 0,
						// paddingTop: 0
					},
					TextElement: {
						color: style.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 14,
						top: itsIOS ? 1 : -1.5,
						paddingRight: itsIOSStyle && 0,
					},
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
				},
				IconElement: {
					color: style.toolbarBtnColor,
				},
				IconNBElement: {
					color: style.toolbarBtnColor,
				},
				alignSelf: null,
				paddingHorizontal: style.buttonPadding,
			},
			flex: 1,
			alignSelf: CENTER,
			alignItems: FLEX_END,
			flexDirection: ROW,
			justifyContent: FLEX_END,
		},
		backgroundColor: style.toolbarDefaultBg,
		flexDirection: ROW,
		// paddingHorizontal: 10,
		paddingLeft: itsIOS && !!itsUnitedStyle ? 6 : 10,
		paddingRight: 10,
		justifyContent: CENTER,
		paddingTop: itsIOS ? 18 : 0,
		borderBottomWidth: itsIOS ? 1 / PixelRatio.getPixelSizeForLayoutSize(1) : 0,
		borderBottomColor: style.toolbarDefaultBorder,
		height: itsIOSStyle ? style.toolbarHeight + 10 : style.toolbarHeight,
		elevation: 3,
		shadowColor: itsMaterial && BLACK,
		shadowOffset: itsMaterial && { width: 0, height: 2 },
		shadowOpacity: itsMaterial && 0.2,
		shadowRadius: itsMaterial && 1.2,
		top: 0,
		left: 0,
		right: 0,
	}
}
