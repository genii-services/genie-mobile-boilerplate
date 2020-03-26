const React = require("react")
const Drawer = require("react-native-drawer")

const { BLACK } = require("/constants/style")

const DrawerElement = props => {
	return <Drawer {...props} />
}

DrawerElement.defaultProps = {
	type: "overlay",
	tapToClose: true,
	openDrawerOffset: 0.2,
	panCloseMask: 0.2,
	closedDrawerOffset: 0,
	styles: {
		drawer: {
			shadowColor: BLACK,
			shadowOpacity: 0,
			shadowRadius: 0,
			elevation: 5,
		},
		mainOverlay: {
			opacity: 0,
			backgroundColor: "rgba(0, 0, 0, 0.8)",
			elevation: 0,
		},
	},
	tweenHandler: ratio => ({ mainOverlay: { opacity: ratio / 2 } }),
}

module.exports = DrawerElement
