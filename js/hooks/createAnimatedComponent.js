const React = require("react")
const { Animated } = require("react-native")

module.exports = Component => {
	return Animated.createAnimatedComponent(React.forwardRef((props, ref) => <Component ref={ref} {...props} />))
}
