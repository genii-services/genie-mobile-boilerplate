const React = require("react")
const _ = require("lodash")

const { Children } = React
const Theme = require("./Theme")

/**
 *  컨텍스트를 통해서 자식 컴포넌트에 테마를 제공
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

	const { children } = props

	return Children.only(children)
}

if (__DEV__) {
	const { element, object } = require("/utils/propTypes")
	StyleProvider.propTypes = {
		children: element.isRequired,
		style: object,
	}
}

StyleProvider.defaultProps = {
	style: {},
}

module.exports = StyleProvider
