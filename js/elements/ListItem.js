const MODULE_NAME$ = "ListItemElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { Platform, TouchableHighlight, TouchableNativeFeedback, View } = require("react-native")

const { itsIOS, itsWeb } = require("/utils/device")
const { useStyle } = require("/coordinators")

const ListItem = props => {
	const { stylez } = useStyle(MODULE_NAME$, undefined, defaultStyle => ({
		view: { marginLeft: -17, paddingLeft: 17 },
	}))

	return itsIOS ||
		itsWeb ||
		defaultStyle.androidRipple === false ||
		(!props.onPress && !props.onLongPress) ||
		Platform.Version <= 21 ? (
		<TouchableHighlight style={props.touchableHighlightStyle} underlayColor={defaultStyle.listBtnUnderlayColor} {...props}>
			<View {...props} testID={undefined} />
		</TouchableHighlight>
	) : (
		<TouchableNativeFeedback {...props}>
			<View style={stylez.view}>
				<View {...props} testID={undefined} />
			</View>
		</TouchableNativeFeedback>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType } = require("/utils/propTypes")
	ListItem.propTypes = {
		...TouchableHighlight.propTypes,
		style: oneOfType([object, number, array]),
		touchableHighlightStyle: oneOfType([object, array]),
		itemDivider: bool,
		button: bool,
	}
}

// const { connectStyle } = require("/utils/style")
module.exports = ListItem //connectStyle(ListItem, "NativeBase.ListItem")
