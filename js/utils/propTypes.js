exports.childrenType = function(props, propName, component) {
	let error
	const prop = props[propName]
	React.Children.forEach(prop, child => {
		if (typeof child !== "string" && typeof child !== "number") {
			error = new Error(`${component} should have only string or number`)
		}
	})
	return error
}
