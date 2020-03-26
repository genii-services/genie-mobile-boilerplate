const MODULE_NAME$ = "elements/Checkbox"
console.debug(MODULE_NAME$)

const React = require("react")
const { TouchableOpacity } = require("react-native")
const Ionicons = require("react-native-vector-icons/Ionicons")

const { useStore } = require("/hooks")
const { connectStyle } = require("/utils/style")
const defaultThemeStyle = require("/styles/themes/default")
const { computeProps } = require("/utils/props")
const { itsIOS } = require("/utils/device")

const CheckBox = props => {
	const { checked } = props

	const [theme] = useStore("theme")
	const style = theme ? theme["@@shoutem.theme/themeStyle"].defaultStyle : defaultThemeStyle
	const { color } = props
	const rootProps = computeProps(props, {
		style: {
			borderColor: color || style.checkboxBgColor,
			backgroundColor: checked === true ? color || style.checkboxBgColor : style.checkboxDefaultColor,
		},
	})
	const platformStyle = style.platformStyle
	const iconStyle = {
		color: checked ? style.checkboxTickColor : style.checkboxDefaultColor,
		fontSize: style.CheckboxFontSize,
		lineHeight: style.CheckboxIconSize,
		marginTop: style.CheckboxIconMarginTop,
		textShadowRadius: style.checkboxTextShadowRadius,
	}

	const iconName = itsIOS && platformStyle !== "material" ? "ios-checkmark" : "md-checkmark"

	return (
		<TouchableOpacity s {...props}>
			<Ionicons style={iconStyle} name={iconName} />
		</TouchableOpacity>
	)
}

if (__DEV__) {
	const { array, bool, func, number, object, oneOfType, string } = require("prop-types")
	CheckBox.propTypes = {
		...TouchableOpacity.propTypes,
		style: oneOfType([object, number, array]),
		checked: bool,
		onPress: func,
	}
}

module.exports = connectStyle(CheckBox, MODULE_NAME$)
