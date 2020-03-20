const MODULE_NAME$ = "elements/InputGroup"
console.debug(MODULE_NAME$)

const React = require("react")
const { View, ViewPropTypes } = require("react-native")

const variables = require("/styles/themes/default")
const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const InputGroup = props => {
	const getInitialStyle = () => {
		return {
			roundedInputGroup: {
				borderWidth: props.rounded ? 1 : undefined,
				borderRadius: props.rounded ? variables.inputGroupRoundedBorderRadius : undefined,
			},
		}
	}

	const prepareRootProps = () => {
		const defaultProps = {
			style: getInitialStyle().roundedInputGroup,
		}

		return computeProps(props, defaultProps)
	}

	return <View {...prepareRootProps()}>{props.children}</View>
}

if (__DEV__) {
	const { ViewPropTypes } = require("react-native")
	const PropTypes = require("prop-types")
	InputGroup.propTypes = {
		...ViewPropTypes,
		regular: PropTypes.bool,
		underline: PropTypes.bool,
		rounded: PropTypes.bool,
		success: PropTypes.bool,
		error: PropTypes.bool,
		disabled: PropTypes.bool,
	}
}

module.exports = connectStyle(InputGroup, MODULE_NAME$)
