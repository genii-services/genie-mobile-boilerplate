/** Element Style */
const { CENTER, FLEX_START, FLEX_END, MATERIAL, ROW, TRANSPARENT } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	const { platformStyle } = style

	const iconCommon = {
		"elements/Icon": { color: style.tabBarActiveTextColor },
	}
	const iconNBCommon = {
		"elements/IconNB": { color: style.tabBarActiveTextColor },
	}
	const textCommon = {
		"elements/Text": { color: style.tabBarActiveTextColor },
	}
	const footerTheme = {
		"elements/Left": {
			"elements/Button": {
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
		"elements/Body": {
			flex: 1,
			alignItems: CENTER,
			alignSelf: CENTER,
			flexDirection: ROW,
			"elements/Button": {
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
		"elements/Right": {
			"elements/Button": {
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
		borderTopWidth: itsIOS && platformStyle !== MATERIAL ? style.borderWidth : undefined,
		borderColor: itsIOS && platformStyle !== MATERIAL ? "#cbcbcb" : undefined,
		height: style.footerHeight,
		paddingBottom: style.footerPaddingBottom,
		elevation: 3,
		left: 0,
		right: 0,
	}
	return footerTheme
}
