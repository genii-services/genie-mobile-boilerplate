require("react")
const ReactNative = require("react-native")
const { TouchableOpacity } = ReactNative

const Button = props => {
	return (
		<TouchableOpacity activeOpacity={0.6} {...props}>
			{props.children}
		</TouchableOpacity>
	)
}

module.exports = Button
