require("react")
const ReactNative = require("react-native")
const { TouchableNativeFeedback } = ReactNative

const Button = props => {
	return (
		<TouchableNativeFeedback
			delayPressIn={0} // eslint-disable-line new-cap
			{...props}>
			{props.children}
		</TouchableNativeFeedback>
	)
}

module.exports = Button
