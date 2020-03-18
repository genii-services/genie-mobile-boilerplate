const HomeScreenStyle = ({ fontFamily, fontSizes, colors, grayscaleColors, backgroundColors }) => {
	console.debug("Settings.getStyle", "fontSizes[0]", fontSizes[0])
	return StyleSheet.create({
		profile: {
			height: 94,
			padding: 10,
		},
		list: {
			backgroundColor: backgroundColors[4], // #eeeeee
		},

		item: {
			marginLeft: 0,
			backgroundColor: backgroundColors[4], // #eeeeee
		},
		photo: {
			marginLeft: 10,
		},

		tels: {
			fontSize: fontSizes[1],
		},

		notiArea: {
			marginHorizontal: 0,
			marginVertical: 0,
			paddingHorizontal: 10,
			paddingTop: 15,
			paddingBottom: 5,
			backgroundColor: backgroundColors[5], // white
			flexDirection: "row",
			justifyContent: "space-around",
		},

		rectButtonArea: {
			marginHorizontal: 10,
			marginVertical: 10,
			padding: 0,
			flexDirection: "row",
			justifyContent: "space-around",
			flexWrap: "wrap",
		},
		qnaArea: {
			margin: 10,
			marginLeft: 15,
			marginRight: 15,
			backgroundColor: "#ECBA51", // backgroundColors[4], // #eeeeee 	// "#ECBA51"
			padding: 20,
		},
		qnaAreaTitle: {
			marginBottom: 5,
			fontFamily,
			fontSize: Math.min(fontSizes[10], 25),
			fontWeight: "600",
			color: "white",
		},
		qnaAreaText: {
			fontFamily,
			fontSize: Math.min(fontSizes[6], 16),
			fontWeight: "500",
			color: colors[2],
		},

		board: {},
		boardTitleBar: {
			marginLeft: 15,
			marginRight: 10,
			paddingVertical: 10,
		},
		boardTitleBarText: {
			fontSize: fontSizes[7],
			fontWeight: "600",
			color: colors[5],
		},
		boardTitleBarIcon: {
			fontSize: fontSizes[9],
			color: colors[5],
		},

		boardListItem: {
			marginTop: 0,
			marginBottom: 0,
			marginLeft: 15,
			marginRight: 15,
			paddingTop: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0,
			borderBottomWidth: 0,
			backgroundColor: backgroundColors[5], // white
		},

		boardListItemText: {
			flex: 0.68,
			marginVertical: 10,
			marginHorizontal: 0,
			padding: 0,
			fontFamily,
			fontSize: fontSizes[6],
			lineHeight: fontSizes[6] + 1,
			fontWeight: "500",
			color: grayscaleColors[8],
		},
		boardListItemTextRight: {
			flex: 0.32, // 아이폰5에서 날짜가 2줄로 나와 0.02 키움
			marginVertical: 10,
			marginHorizontal: 0,
			padding: 0,
			fontFamily,
			fontSize: fontSizes[4],
			lineHeight: fontSizes[4] + 1,
			fontWeight: "500",
			color: grayscaleColors[5],
			textAlign: "right",
			//letterSpacing:-1,
		},
	})
}

module.exports = HomeScreenStyle
