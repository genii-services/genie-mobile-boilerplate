/** Element Style */
const { CENTER, FLEX_START, FLEX_END, MATERIAL, ROW, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")

module.exports = style => {
	const { platformStyle } = style

	const iconCommon = {
		IconElement: { color: style.tabBarActiveTextColor },
	}
	const iconNBCommon = {
		IconNBElement: { color: style.tabBarActiveTextColor },
	}
	const textCommon = {
		TextElement: { color: style.tabBarActiveTextColor },
	}
	const footerTheme = {
		LeftElement: {
			ButtonElement: {
				".transparent": {
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
					...iconCommon,
					...iconNBCommon,
					...textCommon,
				},
				alignSelf: null,
				...iconCommon,
				...iconNBCommon,
				// ...textCommon
			},
			flex: 1,
			alignSelf: CENTER,
			alignItems: FLEX_START,
		},
		BodyElement: {
			flex: 1,
			alignItems: CENTER,
			alignSelf: CENTER,
			flexDirection: ROW,
			ButtonElement: {
				alignSelf: CENTER,
				".transparent": {
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
					...iconCommon,
					...iconNBCommon,
					...textCommon,
				},
				".full": {
					height: style.footerHeight,
					paddingBottom: style.footerPaddingBottom,
					flex: 1,
				},
				...iconCommon,
				...iconNBCommon,
				// ...textCommon
			},
		},
		RightElement: {
			ButtonElement: {
				".transparent": {
					backgroundColor: TRANSPARENT,
					borderColor: null,
					elevation: 0,
					shadowColor: null,
					shadowOffset: null,
					shadowRadius: null,
					shadowOpacity: null,
					...iconCommon,
					...iconNBCommon,
					...textCommon,
				},
				alignSelf: null,
				...iconCommon,
				...iconNBCommon,
				// ...textCommon
			},
			flex: 1,
			alignSelf: CENTER,
			alignItems: FLEX_END,
		},
		backgroundColor: style.footerDefaultBg,
		flexDirection: ROW,
		justifyContent: CENTER,
		borderTopWidth: itsIOS && platformStyle !== MATERIAL && style.borderWidth,
		borderColor: itsIOS && platformStyle !== MATERIAL && "#cbcbcb",
		height: style.footerHeight,
		paddingBottom: style.footerPaddingBottom,
		elevation: 3,
		left: 0,
		right: 0,
	}
	return footerTheme
}
