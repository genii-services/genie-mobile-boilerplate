const ProfileBarStyle = ({ fontSizes }) => {
	return {
		profileArea: {
			margin: 0,
			padding: 10,
			backgroundColor: "#eeeeee",
		},
		photo: {
			width: 40,
			height: 40,
			borderRadius: 20,
			marginRight: 10,
		},
		text1: {
			fontSize: fontSizes[7],
			fontWeight: "600",
		},
		text2: {
			fontSize: fontSizes[5],
		},
		icon: {},
	}
}

module.exports = ProfileBarStyle
