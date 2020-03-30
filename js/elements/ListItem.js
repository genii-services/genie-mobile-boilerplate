const MODULE_NAME$ = "ListItemElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { Platform, TouchableHighlight, TouchableNativeFeedback, View } = require("react-native")

const { itsIOS, itsWeb } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { useStore } = require("/hooks")

const ListItem = props => {
	const [theme] = useStore("theme")

	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle
	const viewStyle = { marginLeft: -17, paddingLeft: 17 }

	return itsIOS || itsWeb || style.androidRipple === false || (!props.onPress && !props.onLongPress) || Platform.Version <= 21 ? (
		<TouchableHighlight underlayColor={style.listBtnUnderlayColor} {...props} style={props.touchableHighlightStyle}>
			<View {...props} testID={undefined} />
		</TouchableHighlight>
	) : (
		<TouchableNativeFeedback {...props}>
			<View style={viewStyle}>
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

module.exports = ListItem //connectStyle(ListItem, "NativeBase.ListItem")
