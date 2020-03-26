const { Children } = require("react")

exports.childrenType = function(props, propName, component) {
	let error
	const prop = props[propName]
	Children.forEach(prop, child => {
		if (typeof child !== "string" && typeof child !== "number") {
			error = new Error(`${component} should have only string or number`)
		}
	})
	return error
}

const _ = require("lodash")
const { StyleSheet } = require("react-native")

exports.computeProps = function(incomingProps, defaultProps) {
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
			_.forEach(incomingPropsStyle, style =>
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
