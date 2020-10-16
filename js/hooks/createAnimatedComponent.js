const { forwardRef } = require("react")
const { Animated } = require("react-native")

module.exports = Component => {
	return Animated.createAnimatedComponent(forwardRef((props, ref) => <Component ref={ref} {...props} />))
}
