/** Permission Screen Style */
const MODULE_NAME$ = "styles/screens/Permission"
console.debug(MODULE_NAME$)

const { CENTER, FLEX_START, NORMAL, PC100, ROW } = require("/constants/style")
const { screen } = require("/utils/device")

const PermissionScreenStyle = ({ colors, fontFamily }) => {
	console.debug(MODULE_NAME$, "getStyle")
	return {
		container: {
			backgroundColor: colors.black,
		},
		header: {
			backgroundColor: colors.dark,
			alignItems: CENTER,
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
			width: PC100,
			flexDirection: ROW,
			alignItems: CENTER,
			justifyContent: CENTER,
		},
		logo: {
			marginBottom: 40,
			width: 128,
			alignSelf: CENTER, // 좌우 중간
		},
		titleText: {
			marginLeft: 10,
			fontFamily,
			fontSize: 17,
			fontWeight: NORMAL,
			fontStyle: NORMAL,
			letterSpacing: 0.87,
			color: colors.black,
		},
		footerButton: {
			bottom: 20,
			color: colors.dark,
			backgroundColor: colors.blue,
		},
		buttonText: {
			textAlign: CENTER,
			width: screen.min / 2,
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
			fontWeight: NORMAL,
			fontStyle: NORMAL,
			letterSpacing: 0.82,
			color: colors.black,
		},
		accessContentText: {
			marginTop: 5,
			opacity: 0.6,
			fontFamily,
			fontSize: 14,
			fontWeight: NORMAL,
			fontStyle: NORMAL,
			lineHeight: 20,
			letterSpacing: 0.06,
			textAlign: "justify",
			color: "#2a2a2a",
		},
		accessItem: {
			flexDirection: ROW,
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
			alignItems: FLEX_START,
			justifyContent: CENTER,
		},
		footer: {
			alignItems: CENTER,
			backgroundColor: colors.white,
		},
	}
}

module.exports = PermissionScreenStyle
