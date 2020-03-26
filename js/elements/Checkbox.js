const MODULE_NAME$ = "CheckboxElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { TouchableOpacity } = require("react-native")
const Ionicons = require("react-native-vector-icons/Ionicons")

const { useStore } = require("/hooks")
const { connectStyle } = require("/utils/style")

const { computeProps } = require("/utils/props")
const { itsIOS } = require("/utils/device")

const CheckBoxElement = props => {
	const { color, checked } = props

	const [theme] = useStore("theme")
	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle
	const { platformStyle } = style

	const defaultProps = {
		style: {
			borderColor: color || style.checkboxBgColor,
			backgroundColor: checked ? color || style.checkboxBgColor : style.checkboxDefaultColor,
		},
	}
	const rootProps = computeProps(props, defaultProps)

	const iconStyle = {
		color: checked ? style.checkboxTickColor : style.checkboxDefaultColor,
		fontSize: style.CheckboxFontSize,
		lineHeight: style.CheckboxIconSize,
		marginTop: style.CheckboxIconMarginTop,
		textShadowRadius: style.checkboxTextShadowRadius,
	}

	return (
		<TouchableOpacity {...rootProps}>
			<Ionicons style={iconStyle} name={itsIOS && platformStyle !== "material" ? "ios-checkmark" : "md-checkmark"} />
		</TouchableOpacity>
	)
}

if (__DEV__) {
	const { array, bool, func, number, object, oneOfType } = require("/utils/propTypes")
	CheckBoxElement.propTypes = {
		...TouchableOpacity.propTypes,
		style: oneOfType([object, number, array]),
		checked: bool,
		onPress: func,
	}
}

module.exports = connectStyle(CheckBoxElement, MODULE_NAME$)
