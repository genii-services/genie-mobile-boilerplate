console.log("InputGroup")

const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { View, ViewPropTypes } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const variables = require("/styles/themes/default")
const computeProps = require("../utils/computeProps")
const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class InputGroup extends Component {
	getInitialStyle() {
		return {
			roundedInputGroup: {
				borderWidth: this.props.rounded ? 1 : undefined,
				borderRadius: this.props.rounded ? variables.inputGroupRoundedBorderRadius : undefined,
			},
		}
	}

	prepareRootProps() {
		const defaultProps = {
			style: this.getInitialStyle().roundedInputGroup,
		}

		return computeProps(this.props, defaultProps)
	}
	render() {
		return (
			<View ref={c => (this._root = c)} {...this.prepareRootProps()}>
				{this.props.children}
			</View>
		)
	}
}

InputGroup.propTypes = {
	...ViewPropTypes,
	regular: PropTypes.bool,
	underline: PropTypes.bool,
	rounded: PropTypes.bool,
	success: PropTypes.bool,
	error: PropTypes.bool,
	disabled: PropTypes.bool,
}

module.exports = connectStyle("NativeBase.InputGroup", {}, mapPropsToStyleNames)(InputGroup)
