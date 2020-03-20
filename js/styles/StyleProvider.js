const React = require("react")
const PropTypes = require("prop-types")
const _ = require("lodash")

const { Children } = React
const Theme = require("./Theme")
const { ThemeShape } = Theme

/**
 *  Provides a theme to child components trough context.
 */
const StyleProvider = props => {
	const { useThis } = require("/hooks")
	const _this = useThis()
	const [_theme, set_theme] = useState(createTheme(props))

	if (_this.style !== props.style) {
		_this.style = props.style
		set_theme(createTheme(props))
	}

	const createTheme = props => new Theme(props.style)

	const { children } = this.props

	return Children.only(children)
}
StyleProvider.propTypes = {
	children: PropTypes.element.isRequired,
	style: PropTypes.object,
}

StyleProvider.defaultProps = {
	style: {},
}

module.exports = StyleProvider
