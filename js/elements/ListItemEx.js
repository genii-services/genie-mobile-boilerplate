/** 공통 라이브러리 */
require("react")
const { View, TouchableHighlight } = require("react-native")

const { FLEX_START, NOWRAP } = require("/constants/style")

const ListItemElement = ({ style, borderColor, borderWidth, onPress, onLongPress, ...props }) => {
	style = [
		{
			borderBottomColor: borderColor,
			borderBottomWidth: borderWidth,
			flex: 1,
			flexWrap: NOWRAP,
			padding: 10,
			justifyContent: FLEX_START,
			alignItems: FLEX_START,
		},
		style,
	]
	return (
		<TouchableHighlight underlayColor="rgba(0,0,0,0)" delayLongPress={onLongPress ? 1000 : 10000} onPress={onPress}>
			<View {...props} style={style} />
		</TouchableHighlight>
	)
}

ListItemElement.defaultProps = {
	...View.defaultProps,
	borderColor: "#e0e0e0",
	borderBottomWidth: 1,
}

ListItemElement.displayName = "ListItem"

module.exports = ListItemElement
