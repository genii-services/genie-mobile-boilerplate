const MODULE_NAME$ = "elements/ListItem"
console.debug(MODULE_NAME$)

const React = require("react")
const PropTypes = require("prop-types")
const { Platform, TouchableHighlight, TouchableNativeFeedback, View } = require("react-native")

const { itsIOS, itsWeb } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")
const variable = require("/styles/themes/default")

const ListItem = props => {
	const [theme] = useStore("theme")

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable

	return itsIOS || itsWeb || variables.androidRipple === false || (!props.onPress && !props.onLongPress) || Platform.Version <= 21 ? (
		<TouchableHighlight underlayColor={variables.listBtnUnderlayColor} {...props} style={props.touchableHighlightStyle}>
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

ListItem.propTypes = {
	...TouchableHighlight.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	touchableHighlightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	itemDivider: PropTypes.bool,
	button: PropTypes.bool,
}

module.exports = connectStyle(ListItem, "NativeBase.ListItem")
