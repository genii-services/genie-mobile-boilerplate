/** VLineElement */
require("react")
const { View } = require("react-native")

const { PC100 } = require("/constants/style")

const VLineElement = ({ style, borderColor, borderWidth, width, ...props }) => {
	style = [
		{
			margin: 0,
			marginTop: 0,
			marginBottom: 0,
			padding: 0,
			paddingTop: 0,
			paddingBottom: 0,
			borderRightColor: borderColor,
			borderRightWidth: borderWidth,
			width,
			height: PC100,
		},
		style,
	]
	return <View style={style} {...props} />
}

// STATIC METHODS

VLineElement.defaultProps = {
	...View.defaultProps,
	borderColor: "#e0e0c0",
	borderWidth: 1,
	width: 1,
}

VLineElement.displayName = "VLine"

// EXPORTS

module.exports = VLineElement
