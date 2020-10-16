/** VLine Element */
require("react")
const { View } = require("react-native")

const HLineElement = props => {
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

HLineElement.defaultProps = {
	...View.defaultProps,
	borderColor: "#e0e0c0",
	borderWidth: 1,
}

HLineElement.displayName = "HLine"

module.exports = HLineElement
