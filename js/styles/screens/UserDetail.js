/** UserDetail Screen Style */
const MODULE_NAME$ = "styles/screens/UserDetail"
console.debug(MODULE_NAME$)

const { CENTER, FLEX_START, RIGHT, WHITE } = require("/constants/style")

module.exports = ({ fontFamily, fontSizes, grayscaleColors, textAlign }) => {
	console.debug(MODULE_NAME$, "getStyle")
	return {
		container: {
			backgroundColor: WHITE,
		},
		list: {
			backgroundColor: WHITE,
		},
		listHeader: {
			minHeight: 106,
			borderColor: "#e0e0e0",
			borderTopWidth: 0,
			borderBottomWidth: 1,
			marginLeft: 0,
			alignItems: FLEX_START,
		},
		listHeaderPhoto: {
			borderRadius: 20,
			marginTop: 6,
			marginLeft: 20,
			marginRight: 8,
			width: 40,
			height: 40,
			borderRadius: 20,
		},
		listHeaderText1: {
			fontFamily,
			marginTop: 0,
			paddingBottom: 8,
			fontSize: fontSizes[7],
			fontWeight: "600",
			color: grayscaleColors[8],
		},
		listHeaderText2: {
			fontFamily,
			fontSize: fontSizes[5],
			color: grayscaleColors[8],
			paddingBottom: 4,
		},
		listItem: {
			borderColor: "#e0e0e0",
			borderTopWidth: 0,
			borderBottomWidth: 1,
			marginLeft: 0,
		},
		listItemLabel: {
			width: "33%",
			fontSize: fontSizes[6],
			fontWeight: "500",
			textAlign: RIGHT,
		},
		listItemText: {
			width: "60%",
			marginLeft: 20,
			fontFamily,
			fontSize: fontSizes[6],
			fontWeight: "500",
			color: grayscaleColors[8],
		},
		listItemIcon: {
			fontSize: fontSizes[5],
			width: 15,
			height: 15,
			color: grayscaleColors[2],
		},

		footer: {
			height: 80,
			padding: 0,
			margin: 0,
		},
		footerTab: {
			backgroundColor: "#686868",
			height: 80,
			padding: 0,
			margin: 0,
		},
		footerButton: {
			margin: 0,
			padding: 0,
			borderRightWidth: 1,
			borderRadius: 0,
			borderColor: "#c0c0c0",
		},
		footerIcon: {
			width: 30,
			height: 30,
			marginBottom: 6,
			fontSize: Math.min(fontSizes[11], 30),
			color: WHITE,
			textAlign,
		},
		footerText: {
			minWidth: 30,
			height: 19,
			fontFamily,
			fontSize: Math.min(fontSizes[6], 16),
			color: WHITE,
			textAlign,
		},
	}
}
