/** VLine Element */
const React = require("react")
const { View } = require("react-native")

const VLineElement = props => {
	return (
		<View
			style={{
				borderBottomColor: props.borderColor,
				borderBottomWidth: props.borderWidth,
			}}
			{...props}
		/>
	)
}

VLineElement.defaultProps = {
	...View.defaultProps,
	borderColor: "#e0e0c0",
	borderWidth: 1,
}

module.exports = VLineElement
