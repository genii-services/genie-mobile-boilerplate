/** 공통 라이브러리 */
const { PixelRatio, StatusBar } = require("react-native")

const { CENTER, TRANSPARENT, MATERIAL } = require("/constants/style")
const { itsAndroid, itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const { platformStyle } = theme

	const headerTheme = {
		".span": {
			height: 128,
			"elements/Left": {
				alignSelf: "flex-start",
			},
			"elements/Body": {
				alignSelf: "flex-end",
				alignItems: "flex-start",
				justifyContent: CENTER,
				paddingBottom: 26,
			},
			"elements/Right": {
				alignSelf: "flex-start",
			},
		},
		".hasSubtitle": {
			"elements/Body": {
				"elements/Title": {
					fontSize: theme.titleFontSize - 2,
					fontFamily: theme.titleFontfamily,
					textAlign: CENTER,
					fontWeight: "500",
					paddingBottom: 3,
				},
				"elements/Subtitle": {
					fontSize: theme.subTitleFontSize,
					fontFamily: theme.titleFontfamily,
					color: theme.subtitleColor,
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
			paddingTop: itsAndroid ? StatusBar.currentHeight : undefined,
			height: itsAndroid ? theme.toolbarHeight + StatusBar.currentHeight : theme.toolbarHeight,
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
			"elements/Left": {
				flex: 0.3,
			},
			"elements/Right": {
				flex: 0.3,
			},
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
					color: theme.toolbarBtnTextColor,
					fontWeight: "600",
				},
				"elements/Icon": {
					color: theme.toolbarBtnColor,
				},
				"elements/IconNB": {
					color: theme.toolbarBtnColor,
				},
				paddingHorizontal: theme.buttonPadding,
			},
			paddingHorizontal: 15,
		},
		".searchBar": {
			"elements/Item": {
				"elements/Icon": {
					backgroundColor: TRANSPARENT,
					color: theme.dropdownLinkColor,
					fontSize: theme.toolbarSearchIconSize,
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
					height: theme.searchBarInputHeight,
				},
				alignSelf: CENTER,
				alignItems: CENTER,
				justifyContent: "flex-start",
				flex: 1,
				height: theme.searchBarHeight,
				borderColor: "transparent",
				backgroundColor: theme.toolbarInputColor,
			},
			"elements/Button": {
				".transparent": {
					"elements/Text": {
						fontWeight: "500",
					},
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
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize,
						marginTop: 2,
						marginRight: 5,
						marginLeft: 2,
					},
					"elements/Text": {
						color: theme.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 0,
						marginLeft: 7,
						lineHeight: 19.5,
					},
					"elements/IconNB": {
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize,
						marginTop: 2,
						marginRight: 5,
						marginLeft: 2,
					},
				},
				".transparent": {
					marginLeft: itsIOS && platformStyle !== MATERIAL ? -3 : 0,
					"elements/Icon": {
						color: theme.toolbarBtnColor,
						fontSize: itsIOS && theme.platformStyle !== MATERIAL ? theme.iconHeaderSize + 1 : theme.iconHeaderSize,
						marginTop: 0,
						marginRight: 2,
						marginLeft: 1,
						paddingTop: 1,
					},
					"elements/IconNB": {
						color: theme.toolbarBtnColor,
						fontSize: itsIOS && theme.platformStyle !== MATERIAL ? theme.iconHeaderSize + 1 : theme.iconHeaderSize - 2,
						marginTop: 0,
						marginRight: 2,
						marginLeft: 1,
						paddingTop: 1,
					},
					"elements/Text": {
						color: theme.toolbarBtnTextColor,
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
					color: theme.toolbarBtnColor,
				},
				"elements/IconNB": {
					color: theme.toolbarBtnColor,
				},
				alignSelf: null,
				paddingRight: theme.buttonPadding,
				paddingLeft: itsIOS && platformStyle !== MATERIAL ? 4 : 8,
			},
			flex: itsIOS && platformStyle !== MATERIAL ? 1 : 0.4,
			alignSelf: CENTER,
			alignItems: "flex-start",
		},
		"elements/Body": {
			flex: 1,
			alignItems: itsIOS && platformStyle !== MATERIAL ? CENTER : "flex-start",
			alignSelf: CENTER,
			"elements/Segment": {
				borderWidth: 0,
				alignSelf: "flex-end",
				marginRight: itsIOS ? -40 : -55,
			},
			"elements/Button": {
				alignSelf: CENTER,
				".transparent": {
					backgroundColor: TRANSPARENT,
				},
				"elements/Icon": {
					color: theme.toolbarBtnColor,
				},
				"elements/IconNB": {
					color: theme.toolbarBtnColor,
				},
				"elements/Text": {
					color: theme.inverseTextColor,
					backgroundColor: TRANSPARENT,
				},
			},
		},
		"elements/Right": {
			"elements/Button": {
				".hasText": {
					height: 30,
					"elements/Icon": {
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize - 2,
						marginTop: 2,
						marginRight: 2,
						marginLeft: 5,
					},
					"elements/Text": {
						color: theme.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 14,
						lineHeight: 19.5,
					},
					"elements/IconNB": {
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize - 2,
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
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize - 2,
						marginTop: 0,
						marginLeft: 2,
						marginRight: 0,
						// paddingTop: 0
					},
					"elements/IconNB": {
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize - 2,
						marginTop: 0,
						marginLeft: 2,
						marginRight: 0,
						// paddingTop: 0
					},
					"elements/Text": {
						color: theme.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 14,
						top: itsIOS ? 1 : -1.5,
						paddingRight: itsIOS && theme.platformStyle !== MATERIAL ? 0 : undefined,
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
					color: theme.toolbarBtnColor,
				},
				"elements/IconNB": {
					color: theme.toolbarBtnColor,
				},
				alignSelf: null,
				paddingHorizontal: theme.buttonPadding,
			},
			flex: 1,
			alignSelf: CENTER,
			alignItems: "flex-end",
			flexDirection: "row",
			justifyContent: "flex-end",
		},
		backgroundColor: theme.toolbarDefaultBg,
		flexDirection: "row",
		// paddingHorizontal: 10,
		paddingLeft: itsIOS && theme.platformStyle !== MATERIAL ? 6 : 10,
		paddingRight: 10,
		justifyContent: CENTER,
		paddingTop: itsIOS ? 18 : 0,
		borderBottomWidth: itsIOS ? 1 / PixelRatio.getPixelSizeForLayoutSize(1) : 0,
		borderBottomColor: theme.toolbarDefaultBorder,
		height: theme.itsIOS && theme.platformStyle === MATERIAL ? theme.toolbarHeight + 10 : theme.toolbarHeight,
		elevation: 3,
		shadowColor: platformStyle === MATERIAL ? "#000" : undefined,
		shadowOffset: platformStyle === MATERIAL ? { width: 0, height: 2 } : undefined,
		shadowOpacity: platformStyle === MATERIAL ? 0.2 : undefined,
		shadowRadius: platformStyle === MATERIAL ? 1.2 : undefined,
		top: 0,
		left: 0,
		right: 0,
	}

	return headerTheme
}
