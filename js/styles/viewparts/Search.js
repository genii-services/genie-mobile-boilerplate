const SearchStyle = ({ fontSizes, grayscaleColors, backgroundColors }) => {
	return {
		list: {
			backgroundColor: backgroundColors[5], // white
		},
		item: {
			marginLeft: 0,
		},
		photo: {
			width: 60,
			height: 60,
			marginLeft: 15,
			marginRight: 0,
		},
		info: {
			marginLeft: 15,
			width: "75%",
		},
		name: {
			fontSize: fontSizes[7],
			color: grayscaleColors[9],
		},
		tels: {
			flex: 1,
			flexDirection: "row",
		},
		mobileTel: {
			fontSize: fontSizes[3],
			width: 120,
			color: grayscaleColors[7],
		},
		officeTel: {
			fontSize: fontSizes[3],
			width: 120,
			color: grayscaleColors[7],
		},
		font13: {
			fontSize: fontSizes[3],
			color: grayscaleColors[7],
		},
	}
}
module.exports = SearchStyle
