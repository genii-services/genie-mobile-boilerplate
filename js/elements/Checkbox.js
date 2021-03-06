const MODULE_NAME$ = "CheckboxElement"
console.debug(MODULE_NAME$)

require("react")
const { TouchableOpacity } = require("react-native")
const Ionicons = require("react-native-vector-icons/Ionicons")

const { computeProps } = require("/utils/props")
const { itsIOS } = require("/utils/device")

const CheckBoxElement = (props) => {
	const { color, checked } = props

	const { stylez, defaultTheme } = useStyle(CheckBoxElement, { color, checked }, (defaultStyle) => ({
		root: {
			borderColor: color || defaultStyle.checkboxBgColor,
			backgroundColor: checked ? color || defaultStyle.checkboxBgColor : defaultStyle.checkboxDefaultColor,
		},
		icon: {
			color: checked ? defaultStyle.checkboxTickColor : defaultStyle.checkboxDefaultColor,
			fontSize: defaultStyle.CheckboxFontSize,
			lineHeight: defaultStyle.CheckboxIconSize,
			marginTop: defaultStyle.CheckboxIconMarginTop,
			textShadowRadius: defaultStyle.checkboxTextShadowRadius,
		},
	}))

	const rootProps = computeProps(props, stylez.root)
	const iconName = itsIOS && !defaultTheme.itsUnitedStyle ? "ios-checkmark" : "md-checkmark"
	return (
		<TouchableOpacity {...rootProps}>
			<Ionicons style={stylez.icon} name={iconName} />
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
CheckBoxElement.displayName = "CheckBox"

// const { connectStyle } = require("/utils/style")
module.exports = CheckBoxElement //connectStyle(CheckBoxElement, MODULE_NAME$)
