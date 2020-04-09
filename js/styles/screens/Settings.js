/** Settings Screen Style */
const MODULE_NAME$ = "styles/screens/Settings"
console.debug(MODULE_NAME$)

const { FLEX_START, FLEX_END, RIGHT, SPACE_BETWEEN } = require("/constants/style")

const SettingsScreenStyle = ({ fontSizes, grayscaleColors }) => {
	console.debug(MODULE_NAME$, "getStyle")
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
			justifyContent: SPACE_BETWEEN,
			paddingLeft: 25,
		},
		listItem: {
			justifyContent: SPACE_BETWEEN,
			margin: 0,
			padding: 0,
			paddingLeft: 10,
		},
		leftText: {
			fontSize: fontSizes[5],
		},
		right: {
			justifyContent: FLEX_END,
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
