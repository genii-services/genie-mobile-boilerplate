/** 공통 라이브러리 */
const React = require("react")
const { View } = require("react-native")

module.exports = VLine
const VLine = props => {
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
VLine.defaultProps = {
	...View.defaultProps,
	borderColor: "#e0e0c0",
	borderWidth: 1,
}
