/** 공통 라이브러리 */
const { CENTER, MATERIAL } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const defaultTheme = require("/styles/themes/default")

module.exports = (theme = defaultTheme) => {
	const { platformStyle } = theme

	const iconCommon = {
		"NativeBase.Icon": {
			color: theme.tabBarActiveTextColor,
		},
	}
	const iconNBCommon = {
		"NativeBase.IconNB": {
			color: theme.tabBarActiveTextColor,
		},
	}
	const textCommon = {
		"NativeBase.Text": {
			color: theme.tabBarActiveTextColor,
		},
	}
	const footerTheme = {
		"NativeBase.Left": {
			"NativeBase.Button": {
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
		"NativeBase.Body": {
			flex: 1,
			alignItems: CENTER,
			alignSelf: CENTER,
			flexDirection: "row",
			"NativeBase.Button": {
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
		"NativeBase.Right": {
			"NativeBase.Button": {
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
