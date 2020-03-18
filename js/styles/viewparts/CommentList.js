const CommentList = ({ fontFamily, fontSizes, grayscaleColors, backgroundColors }) => {
	return {
		container: {
			backgroundColor: backgroundColors[5], // white
		},
		list: {},
		item: {
			marginLeft: 0,
			alignItems: "flex-start",
		},
		icon: {
			width: 40,
			height: 40,
			borderRadius: 20,
			marginLeft: 10,
		},
		textAuthor: {
			paddingTop: 0,
			fontFamily,
			fontSize: fontSizes[6],
			lineHeight: fontSizes[6] + 1,
			fontWeight: "600",
			color: grayscaleColors[8],
		},
		textDate: {
			fontFamily,
			fontSize: fontSizes[3],
			lineHeight: fontSizes[3] + 1,
			fontWeight: "500",
			color: grayscaleColors[5],
		},
		textBody: {
			fontFamily,
			fontSize: fontSizes[5],
			lineHeight: fontSizes[5] + 1,
			color: grayscaleColors[8],
		},
		bottomInputBox: {
			position: "absolute",
			bottom: -20,
			left: 0,
			right: 0,
			zIndex: 999,
			marginVertical: 20,
			backgroundColor: "#f5f5f5",
		},
	}
}

module.exports = CommentList
