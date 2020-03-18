const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { TextInput } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const variables = require("/styles/themes/default")
const computeProps = require("../utils/computeProps")
const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Textarea extends Component {
	getStyle() {
		return {
			textarea: {
				height: this.props.rowSpan ? this.props.rowSpan * 25 : 60,
			},
		}
	}

	prepareRootProps() {
		const defaultProps = {
			style: this.getStyle().textarea,
		}
		return computeProps(this.props, defaultProps)
	}
	render() {
		return (
			<TextInput
				ref={c => {
					this._textInput = c
					this._root = c
				}}
				{...this.prepareRootProps()}
				multiline
				placeholderTextColor={
					this.props.placeholderTextColor ? this.props.placeholderTextColor : variables.inputColorPlaceholder
				}
				underlineColorAndroid="rgba(0,0,0,0)"
				editable={!this.props.disabled}
			/>
		)
	}
}

Textarea.propTypes = {
	...TextInput.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	rowSpan: PropTypes.number,
	bordered: PropTypes.bool,
	underline: PropTypes.bool,
}

module.exports = connectStyle("NativeBase.Textarea", {}, mapPropsToStyleNames)(Textarea)

console.log("Textarea", "loaded")
