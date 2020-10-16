const { Children } = require("react")

const StaticContainer = props => {
	const shouldComponentUpdate = nextProps => {
		return !!nextProps.shouldUpdate
	}

	const child = props.children
	if (child === null || child === false) return null

	return Children.only(child)
}

module.exports = StaticContainer
