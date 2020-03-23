/** UserSearch Screen Style */
const UserSearchScreenStyle = ({ fontFamily, fontSizes, grayscaleColors, backgroundColors }) => {
	return {
		container: {
			backgroundColor: backgroundColors[5], // white
		},
		list: {},
		item: {
			marginLeft: 0,
		},
		itemPhoto: {
			width: 60,
			height: 60,
			borderRadius: 30,
			marginLeft: 15,
			marginRight: 5,
		},
		itemInfo: {
			marginLeft: 0,
			paddingLeft: 0,
		},
		name: {
			fontFamily,
			fontSize: fontSizes[7],
			color: grayscaleColors[9],
		},
		tels: {
			flexWrap: "wrap",
		},
		tel: {
			fontFamily,
			fontSize: fontSizes[3],
			color: grayscaleColors[7],
		},
		font13: {
			fontFamily,
			fontSize: fontSizes[3],
			color: grayscaleColors[7],
		},
		icon13: {
			width: 30,
			fontSize: fontSizes[3],
			color: grayscaleColors[7],
		},
		listItemsLeft: {
			color: grayscaleColors[7],
			fontSize: fontSizes[11],
			width: 60,
			height: 60,
			marginLeft: 20,
			marginRight: 5,
			paddingTop: 15,
		},
	}
}

module.exports = UserSearchScreenStyle
