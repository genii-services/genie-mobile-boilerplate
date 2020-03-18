const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { Text: RNText } = require("react-native")
const _ = require("lodash")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Text extends Component {
	render() {
		const { uppercase, children } = this.props

		let text
		if (uppercase) {
			text = React.Children.map(children, child => {
				if (_.isString(child)) {
					return _.toUpper(child)
				}
				return child
			})
		} else {
			text = children
		}

		return (
			<RNText ref={c => (this._root = c)} {...this.props}>
				{text}
			</RNText>
		)
	}
}

Text.propTypes = {
	...RNText.propTypes,
	uppercase: PropTypes.bool,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

Text.defaultProps = {
	uppercase: false,
}

module.exports = connectStyle("NativeBase.Text", {}, mapPropsToStyleNames)(Text)

console.log("Text", "loaded")
