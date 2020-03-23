/** MainDrawer Screen Style */
const { COLUMN, FLEX_START, FLEX_END, NOWRAP, PC100, ROW, SPACE_BETWEEN, WHITE } = require("/constants/style")
const { itsIOS, itsIphoneX } = require("/utils/device")

const MainDrawerStyle = ({ fontFamily, fontSizes, backgroundColors }) => {
	return {
		container: {
			marginLeft: 0,
			marginRight: 0,
			padding: 0,
			backgroundColor: backgroundColors[1], // #134a7a
		},
		// for renderForGuest
		guest_container: {
			height: PC100,
			margin: 0,
			paddingVertical: 30,
			paddingHorizontal: 20,
			justifyContent: SPACE_BETWEEN,
			alignItems: FLEX_START,
			backgroundColor: "#134a7a",
		},
		guest_container_view: {
			width: PC100,
			flexDirection: COLUMN,
			flexWrap: NOWRAP,
			alignContent: FLEX_END,
			justifyContent: FLEX_END,
			paddingVertical: 20,
			paddingHorizontal: 0,
		},
		guest_container_text1: { paddingHorizontal: 20, paddingVertical: 5, color: WHITE, fontSize: 16 },
		guest_container_text2: { paddingHorizontal: 20, paddingVertical: 5, color: WHITE, fontSize: 14 },
		guest_container_view2: {
			width: PC100,
			flexDirection: ROW,
			flexWrap: NOWRAP,
			alignContent: FLEX_END,
			justifyContent: FLEX_END,
		},
		guest_container_text3: { paddingHorizontal: 20, paddingVertical: 5, color: WHITE },
		//
		profile: {
			backgroundColor: "#1a66a8",
			minHeight: itsIphoneX ? 100 : 80,
			paddingTop: itsIphoneX ? 35 : itsIOS ? 25 : 5,
		},
		profileText: {
			fontFamily,
			color: WHITE,
		},
		list: {
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			backgroundColor: "#134a7a",
		},
		listItem: {
			flexWrap: "wrap",
			marginLeft: 0,
			paddingLeft: 10,
			paddingRight: 0,
			paddingTop: 0,
			paddingBottom: 0,
			backgroundColor: "#00000000",
			borderColor: "rgba(43, 92, 135, 1)",
		},
		listItemImage: {
			width: 38,
			height: 38,
			marginLeft: 0,
			marginRight: 0,
		},
		listItemText: {
			fontFamily,
			marginLeft: 8,
			color: "#ffffff",
			fontSize: fontSizes[6],
		},
	}
}

module.exports = MainDrawerStyle
