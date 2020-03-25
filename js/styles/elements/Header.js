/** Element Style */
const { PixelRatio, StatusBar } = require("react-native")

const { BLACK, CENTER, FLEX_START, FLEX_END, MATERIAL, ROW, TRANSPARENT } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")

module.exports = style => {
	const { platformStyle } = style
	return {
		".span": {
			height: 128,
			"elements/Left": {
				alignSelf: FLEX_START,
			},
			"elements/Body": {
				alignSelf: FLEX_END,
				alignItems: FLEX_START,
				justifyContent: CENTER,
				paddingBottom: 26,
			},
			"elements/Right": {
				alignSelf: FLEX_START,
			},
		},
		".hasSubtitle": {
			"elements/Body": {
				"elements/Title": {
					fontSize: style.titleFontSize - 2,
					fontFamily: style.titleFontfamily,
					textAlign: CENTER,
					fontWeight: "500",
					paddingBottom: 3,
				},
				"elements/Subtitle": {
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
			"elements/Left": { flex: 0.3 },
			"elements/Right": { flex: 0.3 },
			"elements/Body": {
				flex: 1,
				"elements/Segment": {
					marginRight: 0,
					alignSelf: CENTER,
					"elements/Button": {
						paddingLeft: 0,
						paddingRight: 0,
					},
				},
			},
		},
		".noLeft": {
			"elements/Left": {
				width: itsIOS ? undefined : 0,
				flex: itsIOS ? 1 : 0,
			},
			"elements/Body": {
				"elements/Title": {
					paddingLeft: itsIOS ? undefined : 10,
				},
				"elements/Subtitle": {
					paddingLeft: itsIOS ? undefined : 10,
				},
			},
		},
		"elements/Button": {
			justifyContent: CENTER,
			alignSelf: CENTER,
			alignItems: CENTER,
			".transparent": {
				"elements/Text": {
					color: style.toolbarBtnTextColor,
					fontWeight: "600",
				},
				"elements/Icon": {
					color: style.toolbarBtnColor,
				},
				"elements/IconNB": {
					color: style.toolbarBtnColor,
				},
				paddingHorizontal: style.buttonPadding,
			},
			paddingHorizontal: 15,
		},
		".searchBar": {
			"elements/Item": {
				"elements/Icon": {
					backgroundColor: TRANSPARENT,
					color: style.dropdownLinkColor,
					fontSize: style.toolbarSearchIconSize,
					alignItems: CENTER,
					marginTop: 2,
					paddingRight: 10,
					paddingLeft: 10,
				},
				"elements/IconNB": {
					backgroundColor: TRANSPARENT,
					color: null,
					alignSelf: CENTER,
				},
				"elements/Input": {
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
			"elements/Button": {
				".transparent": {
					"elements/Text": { fontWeight: "500" },
					paddingHorizontal: null,
					paddingLeft: itsIOS ? 10 : null,
				},
				paddingHorizontal: itsIOS ? undefined : null,
				width: itsIOS ? undefined : 0,
				height: itsIOS ? undefined : 0,
			},
		},
		".rounded": {
			"elements/Item": {
				borderRadius: itsIOS && platformStyle !== MATERIAL ? 25 : 3,
			},
		},
		"elements/Left": {
			"elements/Button": {
				".hasText": {
					marginLeft: -10,
					height: 30,
					"elements/Icon": {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize,
						marginTop: 2,
						marginRight: 5,
						marginLeft: 2,
					},
					"elements/Text": {
						color: style.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 0,
						marginLeft: 7,
						lineHeight: 19.5,
					},
					"elements/IconNB": {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize,
						marginTop: 2,
						marginRight: 5,
						marginLeft: 2,
					},
				},
				".transparent": {
					marginLeft: itsIOS && platformStyle !== MATERIAL ? -3 : 0,
					"elements/Icon": {
						color: style.toolbarBtnColor,
						fontSize: itsIOS && style.platformStyle !== MATERIAL ? style.iconHeaderSize + 1 : style.iconHeaderSize,
						marginTop: 0,
						marginRight: 2,
						marginLeft: 1,
						paddingTop: 1,
					},
					"elements/IconNB": {
						color: style.toolbarBtnColor,
						fontSize: itsIOS && style.platformStyle !== MATERIAL ? style.iconHeaderSize + 1 : style.iconHeaderSize - 2,
						marginTop: 0,
						marginRight: 2,
						marginLeft: 1,
						paddingTop: 1,
					},
					"elements/Text": {
						color: style.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 0,
						top: itsIOS ? 1 : -1.5,
						paddingLeft: itsIOS && platformStyle !== MATERIAL ? 2 : 5,
						paddingRight: itsIOS && platformStyle !== MATERIAL ? undefined : 10,
					},
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
				},
				"elements/Icon": {
					color: style.toolbarBtnColor,
				},
				"elements/IconNB": {
					color: style.toolbarBtnColor,
				},
				alignSelf: null,
				paddingRight: style.buttonPadding,
				paddingLeft: itsIOS && platformStyle !== MATERIAL ? 4 : 8,
			},
			flex: itsIOS && platformStyle !== MATERIAL ? 1 : 0.4,
			alignSelf: CENTER,
			alignItems: FLEX_START,
		},
		"elements/Body": {
			flex: 1,
			alignItems: itsIOS && platformStyle !== MATERIAL ? CENTER : FLEX_START,
			alignSelf: CENTER,
			"elements/Segment": {
				borderWidth: 0,
				alignSelf: FLEX_END,
				marginRight: itsIOS ? -40 : -55,
			},
			"elements/Button": {
				alignSelf: CENTER,
				".transparent": {
					backgroundColor: TRANSPARENT,
				},
				"elements/Icon": {
					color: style.toolbarBtnColor,
				},
				"elements/IconNB": {
					color: style.toolbarBtnColor,
				},
				"elements/Text": {
					color: style.inverseTextColor,
					backgroundColor: TRANSPARENT,
				},
			},
		},
		"elements/Right": {
			"elements/Button": {
				".hasText": {
					height: 30,
					"elements/Icon": {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize - 2,
						marginTop: 2,
						marginRight: 2,
						marginLeft: 5,
					},
					"elements/Text": {
						color: style.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 14,
						lineHeight: 19.5,
					},
					"elements/IconNB": {
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
					"elements/Icon": {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize - 2,
						marginTop: 0,
						marginLeft: 2,
						marginRight: 0,
						// paddingTop: 0
					},
					"elements/IconNB": {
						color: style.toolbarBtnColor,
						fontSize: style.iconHeaderSize - 2,
						marginTop: 0,
						marginLeft: 2,
						marginRight: 0,
						// paddingTop: 0
					},
					"elements/Text": {
						color: style.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 14,
						top: itsIOS ? 1 : -1.5,
						paddingRight: itsIOS && style.platformStyle !== MATERIAL && 0,
					},
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
				},
				"elements/Icon": {
					color: style.toolbarBtnColor,
				},
				"elements/IconNB": {
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
		paddingLeft: itsIOS && style.platformStyle !== MATERIAL ? 6 : 10,
		paddingRight: 10,
		justifyContent: CENTER,
		paddingTop: itsIOS ? 18 : 0,
		borderBottomWidth: itsIOS ? 1 / PixelRatio.getPixelSizeForLayoutSize(1) : 0,
		borderBottomColor: style.toolbarDefaultBorder,
		height: style.itsIOS && style.platformStyle === MATERIAL ? style.toolbarHeight + 10 : style.toolbarHeight,
		elevation: 3,
		shadowColor: platformStyle === MATERIAL && BLACK,
		shadowOffset: platformStyle === MATERIAL && { width: 0, height: 2 },
		shadowOpacity: platformStyle === MATERIAL && 0.2,
		shadowRadius: platformStyle === MATERIAL && 1.2,
		top: 0,
		left: 0,
		right: 0,
	}
}
