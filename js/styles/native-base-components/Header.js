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
			"NativeBase.Left": {
				alignSelf: "flex-start",
			},
			"NativeBase.Body": {
				alignSelf: "flex-end",
				alignItems: "flex-start",
				justifyContent: CENTER,
				paddingBottom: 26,
			},
			"NativeBase.Right": {
				alignSelf: "flex-start",
			},
		},
		".hasSubtitle": {
			"NativeBase.Body": {
				"NativeBase.Title": {
					fontSize: theme.titleFontSize - 2,
					fontFamily: theme.titleFontfamily,
					textAlign: CENTER,
					fontWeight: "500",
					paddingBottom: 3,
				},
				"NativeBase.Subtitle": {
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
			"NativeBase.Left": {
				flex: 0.3,
			},
			"NativeBase.Right": {
				flex: 0.3,
			},
			"NativeBase.Body": {
				flex: 1,
				"NativeBase.Segment": {
					marginRight: 0,
					alignSelf: CENTER,
					"NativeBase.Button": {
						paddingLeft: 0,
						paddingRight: 0,
					},
				},
			},
		},
		".noLeft": {
			"NativeBase.Left": {
				width: itsIOS ? undefined : 0,
				flex: itsIOS ? 1 : 0,
			},
			"NativeBase.Body": {
				"NativeBase.Title": {
					paddingLeft: itsIOS ? undefined : 10,
				},
				"NativeBase.Subtitle": {
					paddingLeft: itsIOS ? undefined : 10,
				},
			},
		},
		"NativeBase.Button": {
			justifyContent: CENTER,
			alignSelf: CENTER,
			alignItems: CENTER,
			".transparent": {
				"NativeBase.Text": {
					color: theme.toolbarBtnTextColor,
					fontWeight: "600",
				},
				"NativeBase.Icon": {
					color: theme.toolbarBtnColor,
				},
				"NativeBase.IconNB": {
					color: theme.toolbarBtnColor,
				},
				paddingHorizontal: theme.buttonPadding,
			},
			paddingHorizontal: 15,
		},
		".searchBar": {
			"NativeBase.Item": {
				"NativeBase.Icon": {
					backgroundColor: TRANSPARENT,
					color: theme.dropdownLinkColor,
					fontSize: theme.toolbarSearchIconSize,
					alignItems: CENTER,
					marginTop: 2,
					paddingRight: 10,
					paddingLeft: 10,
				},
				"NativeBase.IconNB": {
					backgroundColor: TRANSPARENT,
					color: null,
					alignSelf: CENTER,
				},
				"NativeBase.Input": {
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
			"NativeBase.Button": {
				".transparent": {
					"NativeBase.Text": {
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
			"NativeBase.Item": {
				borderRadius: itsIOS && platformStyle !== MATERIAL ? 25 : 3,
			},
		},
		"NativeBase.Left": {
			"NativeBase.Button": {
				".hasText": {
					marginLeft: -10,
					height: 30,
					"NativeBase.Icon": {
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize,
						marginTop: 2,
						marginRight: 5,
						marginLeft: 2,
					},
					"NativeBase.Text": {
						color: theme.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 0,
						marginLeft: 7,
						lineHeight: 19.5,
					},
					"NativeBase.IconNB": {
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize,
						marginTop: 2,
						marginRight: 5,
						marginLeft: 2,
					},
				},
				".transparent": {
					marginLeft: itsIOS && platformStyle !== MATERIAL ? -3 : 0,
					"NativeBase.Icon": {
						color: theme.toolbarBtnColor,
						fontSize: itsIOS && theme.platformStyle !== MATERIAL ? theme.iconHeaderSize + 1 : theme.iconHeaderSize,
						marginTop: 0,
						marginRight: 2,
						marginLeft: 1,
						paddingTop: 1,
					},
					"NativeBase.IconNB": {
						color: theme.toolbarBtnColor,
						fontSize: itsIOS && theme.platformStyle !== MATERIAL ? theme.iconHeaderSize + 1 : theme.iconHeaderSize - 2,
						marginTop: 0,
						marginRight: 2,
						marginLeft: 1,
						paddingTop: 1,
					},
					"NativeBase.Text": {
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
				"NativeBase.Icon": {
					color: theme.toolbarBtnColor,
				},
				"NativeBase.IconNB": {
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
		"NativeBase.Body": {
			flex: 1,
			alignItems: itsIOS && platformStyle !== MATERIAL ? CENTER : "flex-start",
			alignSelf: CENTER,
			"NativeBase.Segment": {
				borderWidth: 0,
				alignSelf: "flex-end",
				marginRight: itsIOS ? -40 : -55,
			},
			"NativeBase.Button": {
				alignSelf: CENTER,
				".transparent": {
					backgroundColor: TRANSPARENT,
				},
				"NativeBase.Icon": {
					color: theme.toolbarBtnColor,
				},
				"NativeBase.IconNB": {
					color: theme.toolbarBtnColor,
				},
				"NativeBase.Text": {
					color: theme.inverseTextColor,
					backgroundColor: TRANSPARENT,
				},
			},
		},
		"NativeBase.Right": {
			"NativeBase.Button": {
				".hasText": {
					height: 30,
					"NativeBase.Icon": {
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize - 2,
						marginTop: 2,
						marginRight: 2,
						marginLeft: 5,
					},
					"NativeBase.Text": {
						color: theme.toolbarBtnTextColor,
						fontSize: itsIOS ? 17 : 14,
						lineHeight: 19.5,
					},
					"NativeBase.IconNB": {
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
					"NativeBase.Icon": {
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize - 2,
						marginTop: 0,
						marginLeft: 2,
						marginRight: 0,
						// paddingTop: 0
					},
					"NativeBase.IconNB": {
						color: theme.toolbarBtnColor,
						fontSize: theme.iconHeaderSize - 2,
						marginTop: 0,
						marginLeft: 2,
						marginRight: 0,
						// paddingTop: 0
					},
					"NativeBase.Text": {
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
				"NativeBase.Icon": {
					color: theme.toolbarBtnColor,
				},
				"NativeBase.IconNB": {
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
