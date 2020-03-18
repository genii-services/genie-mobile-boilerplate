const SettingsScreenStyle = ({ fontSizes, grayscaleColors }) => {
	return {
		container: {
			margin: 0,
			padding: 0,
		},
		list: {
			margin: 0,
			marginLeft: -15,
			padding: 0,
		},
		listItemDivider: {
			justifyContent: "space-between",
			paddingLeft: 25,
		},
		listItem: {
			justifyContent: "space-between",
			margin: 0,
			padding: 0,
			paddingLeft: 10,
		},
		leftText: {
			fontSize: fontSizes[5],
		},
		right: {
			justifyContent: "flex-end",
			marginTop: -10,
			marginBottom: -10,
			marginRight: 0,
			paddingTop: 0,
			paddingBottom: 0,
		},
		rightButton: {
			backgroundColor: "#9b9b9b",
		},
		rightButtonText: {
			backgroundColor: "#9b9b9b",
			fontSize: fontSizes[5],
		},
		rightText: {
			marginRight: 0,
			paddingRight: 0,
			textAlign: RIGHT,
			fontSize: fontSizes[5],
			color: grayscaleColors[8],
		},
		rightIcon: {
			margin: 0,
			padding: 0,
			color: grayscaleColors[3],
		},
		switch: {},
	}
}
module.exports = SettingsScreenStyle
