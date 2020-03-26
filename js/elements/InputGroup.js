const MODULE_NAME$ = "InputGroupElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { View } = require("react-native")

const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const InputGroup = props => {
	const [theme] = useStore("theme")
	const defaultStyle = theme["@@shoutem.theme/themeStyle"].defaultStyle

	const defaultProps = {
		style: {
			borderWidth: props.rounded && 1,
			borderRadius: props.rounded && defaultStyle.inputGroupRoundedBorderRadius,
		},
	}

	const rootProps = computeProps(props, defaultProps)

	return <View {...rootProps}>{props.children}</View>
}

if (__DEV__) {
	const { bool, ViewPropTypes } = require("/utils/propTypes")
	InputGroup.propTypes = {
		...ViewPropTypes,
		regular: bool,
		underline: bool,
		rounded: bool,
		success: bool,
		error: bool,
		disabled: bool,
	}
}

module.exports = connectStyle(InputGroup, MODULE_NAME$)
