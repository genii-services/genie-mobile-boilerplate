const { W50PC } = require("/styles")

const PermissionScreenStyle = ({ colors, fontFamily }) => {
	return {
		container: {
			backgroundColor: colors.black,
		},
		header: {
			backgroundColor: colors.dark,
			alignItems: "center",
		},
		content: {
			paddingHorizontal: "5%",
			backgroundColor: colors.white,
		},
		headerIcon: {
			color: colors.mid,
		},
		titleWrapper: {
			marginTop: 100,
			width: "100%",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
		},
		logo: {
			marginBottom: 40,
			width: 128,
			alignSelf: "center", // 좌우 중간
		},
		titleText: {
			marginLeft: 10,
			fontFamily,
			fontSize: 17,
			fontWeight: "normal",
			fontStyle: "normal",
			letterSpacing: 0.87,
			color: colors.black,
		},
		footerButton: {
			bottom: 20,
			color: colors.dark,
			backgroundColor: colors.blue,
		},
		buttonText: {
			textAlign: "center",
			width: W50PC,
			fontSize: 14,
			color: colors.light,
		},
		guide: {
			marginTop: 50,
			marginHorizontal: 30,
		},
		accessTitleText: {
			fontFamily,
			fontSize: 16,
			fontWeight: "normal",
			fontStyle: "normal",
			letterSpacing: 0.82,
			color: colors.black,
		},
		accessContentText: {
			marginTop: 5,
			opacity: 0.6,
			fontFamily,
			fontSize: 14,
			fontWeight: "normal",
			fontStyle: "normal",
			lineHeight: 20,
			letterSpacing: 0.06,
			textAlign: "justify",
			color: "#2a2a2a",
		},
		accessItem: {
			flexDirection: "row",
			marginTop: 24,
			height: 44,
		},
		accessItemLeft: {
			flex: 2,
		},
		icon: {
			width: 30,
			height: 30,
		},
		accessItemRight: {
			flex: 8,
			alignItems: "flex-start",
			justifyContent: "center",
		},
		footer: {
			alignItems: "center",
			backgroundColor: colors.white,
		},
	}
}

module.exports = PermissionScreenStyle
