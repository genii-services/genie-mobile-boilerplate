/** 공통 라이브러리 */
const { CENTER, MATERIAL } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const { platformStyle } = theme

	const iconCommon = {
		"elements/Icon": { color: theme.tabBarActiveTextColor },
	}
	const iconNBCommon = {
		"elements/IconNB": { color: theme.tabBarActiveTextColor },
	}
	const textCommon = {
		"elements/Text": { color: theme.tabBarActiveTextColor },
	}
	const footerTheme = {
		"elements/Left": {
			"elements/Button": {
				".transparent": {
					backgroundColor: "transparent",
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
			alignItems: "flex-start",
		},
		"elements/Body": {
			flex: 1,
			alignItems: CENTER,
			alignSelf: CENTER,
			flexDirection: "row",
			"elements/Button": {
				alignSelf: CENTER,
				".transparent": {
					backgroundColor: "transparent",
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
					height: theme.footerHeight,
					paddingBottom: theme.footerPaddingBottom,
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
					backgroundColor: "transparent",
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
			alignItems: "flex-end",
		},
		backgroundColor: theme.footerDefaultBg,
		flexDirection: "row",
		justifyContent: CENTER,
		borderTopWidth: itsIOS && platformStyle !== MATERIAL ? theme.borderWidth : undefined,
		borderColor: itsIOS && platformStyle !== MATERIAL ? "#cbcbcb" : undefined,
		height: theme.footerHeight,
		paddingBottom: theme.footerPaddingBottom,
		elevation: 3,
		left: 0,
		right: 0,
	}
	return footerTheme
}
