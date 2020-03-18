const Tab = ({ fontFamily, fontSizes, colors, backgroundColors, textAlign }) => {
	return {
		tabBarUnderline: {
			backgroundColor: backgroundColors[2], // #3e83be
			height: 2,
		},
		tab: {
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			paddingRight: 0,
			backgroundColor: backgroundColors[5], // white
		},
		activeTab: {
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			paddingRight: 0,
			backgroundColor: backgroundColors[5], // white
		},
		tabText: {
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			paddingRight: 0,
			fontFamily,
			fontSize: fontSizes[6],
			lineHeight: fontSizes[6] + 1,
			color: colors[4],
			textAlign,
		},
		activeTabText: {
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			paddingRight: 0,
			fontFamily,
			fontSize: fontSizes[6],
			lineHeight: fontSizes[6] + 1,
			color: colors[4],
			textAlign,
			fontWeight: "600",
		},
	}
}

module.exports = Tab
