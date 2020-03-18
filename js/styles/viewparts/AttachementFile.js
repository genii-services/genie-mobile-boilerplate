const AttachementFileStyle = ({ fontSizes, grayscaleColors }) => {
	return {
		listItem: {
			flex: 1,
			marginLeft: 0,
			paddingTop: 0, //13
			paddingBottom: 0, //13
			borderBottomWidth: 1,
		},
		icon: {
			marginLeft: 12,
			marginRight: 6,
			width: 18,
			height: 18,
			fontSize: fontSizes[6],
		},
		iconImage: {
			marginLeft: 12,
			marginRight: 6,
			width: 18,
			height: 18,
		},
		name: {
			flex: 1,
			marginLeft: 8,
			marginRight: 8,
			marginTop: 0,
			marginBottom: 0,
			fontSize: fontSizes[6],
		},
		size: {
			marginLeft: 6,
			marginRight: 16,
			fontSize: fontSizes[3],
			color: grayscaleColors[5],
			textAlign: "right",
		},
	}
}

module.exports = AttachementFileStyle
