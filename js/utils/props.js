const _ = require("lodash")
const { StyleSheet } = require("react-native")

/**
 * 자식 컴포넌트를 삭제하고, defaultProps와 합쳐서 제공
 * @param {*} incomingProps
 * @param {*} defaultProps
 */
exports.computeProps = function (incomingProps, defaultProps) {
	const clonedIncomingProps = _.clone(incomingProps)
	delete clonedIncomingProps.children
	delete clonedIncomingProps.style

	// External props has a higher precedence
	const computedProps = incomingProps ? _.assign({}, defaultProps, incomingProps) : defaultProps

	// Pass the merged Style Object instead
	const incomingPropsStyle = incomingProps.style
	if (incomingPropsStyle) {
		let computedPropsStyle = {}
		computedProps.style = {}
		if (Array.isArray(incomingPropsStyle)) {
			_.forEach(incomingPropsStyle, (style) =>
				_.merge(computedPropsStyle, typeof style === "number" ? StyleSheet.flatten(style) : style)
			)
		} else if (typeof incomingPropsStyle === "number") {
			computedPropsStyle = StyleSheet.flatten(incomingPropsStyle)
		} else {
			computedPropsStyle = incomingPropsStyle
		}
		_.merge(computedProps.style, defaultProps.style, computedPropsStyle)
	}
	return computedProps
}
