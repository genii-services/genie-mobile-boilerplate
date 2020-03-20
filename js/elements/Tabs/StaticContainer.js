const React = require("react")

const StaticContainer = props => {
	shouldComponentUpdate(nextProps) {
		return !!nextProps.shouldUpdate
	}

	render() {
		const child = this.props.children
		if (child === null || child === false) {
			return null
		}
		return React.Children.only(child)
	}
}

module.exports = StaticContainer
