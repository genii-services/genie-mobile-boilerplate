const MODULE_NAME$ = "elements/ListItem"
console.debug(MODULE_NAME$)

const React = require("react")
const { Platform, TouchableHighlight, TouchableNativeFeedback, View } = require("react-native")

const { itsIOS, itsWeb } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")

const ListItem = props => {
	const [theme] = useStore("theme")

	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle

	return itsIOS || itsWeb || style.androidRipple === false || (!props.onPress && !props.onLongPress) || Platform.Version <= 21 ? (
		<TouchableHighlight underlayColor={style.listBtnUnderlayColor} {...props} style={props.touchableHighlightStyle}>
			<View {...props} testID={undefined} />
		</TouchableHighlight>
	) : (
		<TouchableNativeFeedback {...props}>
			<View style={{ marginLeft: -17, paddingLeft: 17 }}>
				<View {...props} testID={undefined} />
			</View>
		</TouchableNativeFeedback>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")

	ListItem.propTypes = {
		...TouchableHighlight.propTypes,
		style: oneOfType([object, number, array]),
		touchableHighlightStyle: oneOfType([object, array]),
		itemDivider: bool,
		button: bool,
	}
}

module.exports = connectStyle(ListItem, "NativeBase.ListItem")
