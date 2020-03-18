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
			height: "100%",
			margin: 0,
			paddingVertical: 30,
			paddingHorizontal: 20,
			justifyContent: "space-between",
			alignItems: "flex-start",
			backgroundColor: "#134a7a",
		},
		guest_container_view: {
			width: "100%",
			flexDirection: "column",
			flexWrap: "nowrap",
			alignContent: "flex-end",
			justifyContent: "flex-end",
			paddingVertical: 20,
			paddingHorizontal: 0,
		},
		guest_container_text1: { paddingHorizontal: 20, paddingVertical: 5, color: "white", fontSize: 16 },
		guest_container_text2: { paddingHorizontal: 20, paddingVertical: 5, color: "white", fontSize: 14 },
		guest_container_view2: {
			width: "100%",
			flexDirection: "row",
			flexWrap: "nowrap",
			alignContent: "flex-end",
			justifyContent: "flex-end",
		},
		guest_container_text3: { paddingHorizontal: 20, paddingVertical: 5, color: "white" },
		//
		profile: {
			backgroundColor: "#1a66a8",
			minHeight: itsIphoneX ? 100 : 80,
			paddingTop: itsIphoneX ? 35 : itsIOS ? 25 : 5,
		},
		profileText: {
			fontFamily,
			color: "white",
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
