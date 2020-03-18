const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { ActivityIndicator } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const variable = require("/styles/themes/default")
const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Spinner extends Component {
	static contextTypes = {
		theme: PropTypes.object,
	}
	render() {
		const { props } = this
		const variables = this.context.theme ? this.context.theme["@@shoutem.theme/themeStyle"].variables : variable
		return (
			<ActivityIndicator
				ref={c => (this._root = c)}
				{...props}
				color={props.color ? props.color : props.inverse ? variables.inverseSpinnerColor : variables.defaultSpinnerColor}
				size={props.size ? props.size : "large"}
			/>
		)
	}
}

Spinner.propTypes = {
	...ActivityIndicator.propTypes,
	color: PropTypes.string,
	inverse: PropTypes.bool,
}

module.exports = connectStyle("NativeBase.Spinner", {}, mapPropsToStyleNames)(Spinner)
