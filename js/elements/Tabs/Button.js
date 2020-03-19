const React = require("react")
const ReactNative = require("react-native")
const { TouchableOpacity } = ReactNative

const Button = ({ children, ...props }) => {
	return <TouchableOpacity {...props}>{children}</TouchableOpacity>
}

module.exports = Button
