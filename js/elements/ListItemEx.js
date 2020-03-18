/** 공통 라이브러리 */
const React = require("react")

const { View, TouchableHighlight } = require("react-native")

const ListItem = ({ onPress, onLongPress, ...props }) => {
	return (
		<TouchableHighlight underlayColor="rgba(0,0,0,0)" delayLongPress={onLongPress ? 1000 : 10000} onPress={onPress}>
			<View
				{...props}
				style={[
					{
						borderBottomColor: props.borderColor,
						borderBottomWidth: props.borderWidth,
						flex: 1,
						flexWrap: "nowrap",
						padding: 10,
						justifyContent: "flex-start",
						alignItems: "flex-start",
					},
					props.style,
				]}
			/>
		</TouchableHighlight>
	)
}

ListItem.defaultProps = {
	...View.defaultProps,
	borderColor: "#e0e0e0",
	borderBottomWidth: 1,
}

module.exports = ListItem
