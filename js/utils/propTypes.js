const { Children } = require("react")
const PropTypes = require("prop-types")
const { ViewPropTypes } = require("react-native")

module.exports = {
	...PropTypes,
	ViewPropTypes,
	childrenType: function(props, propName, component) {
		let error
		const prop = props[propName]
		Children.forEach(prop, child => {
			if (typeof child !== "string" && typeof child !== "number") {
				error = new Error(`${component} should have only string or number`)
			}
		})
		return error
	},
}
