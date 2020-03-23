/** 공통 라이브러리 */
const React = require("react")
const { View } = require("react-native")

const { ABSOLUTE, BLACK, CENTER, PC100, TRANSPARENT, WHITE } = require("/constants/style")

const VLine = props => {
	return (
		<View
			style={{
				margin: 0,
				marginTop: 0,
				marginBottom: 0,
				padding: 0,
				paddingTop: 0,
				paddingBottom: 0,
				borderRightColor: props.borderColor,
				borderRightWidth: props.borderWidth,
				width: props.width || 1,
				height: PC100,
			}}
			{...props}
		/>
	)
}

// STATIC METHODS

VLine.defaultProps = {
	...View.defaultProps,
	borderColor: "#e0e0c0",
	borderWidth: 1,
	width: 1,
}

// EXPORTS

module.exports = VLine
