const MODULE_NAME$ = "elements/Checkbox"
console.debug(MODULE_NAME$)

const React = require("react")
const { TouchableOpacity } = require("react-native")
const Ionicons = require("react-native-vector-icons/Ionicons")

const { useStore } = require("/hooks")
const { connectStyle } = require("/utils/style")

const { computeProps } = require("/utils/props")
const { itsIOS } = require("/utils/device")

const CheckBox = props => {
	const [theme] = useStore("theme")

	const getInitialStyle = style => {
		const { color, checked } = props
		return {
			checkStyle: {
				borderColor: color || style.checkboxBgColor,
				backgroundColor: checked === true ? color || style.checkboxBgColor : style.checkboxDefaultColor,
			},
		}
	}

	const prepareRootProps = style => {
		const defaultProps = {
			style: getInitialStyle(style).checkStyle,
		}
		return computeProps(props, defaultProps)
	}

	const { checked } = props
	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle
	const platformStyle = style.platformStyle
	return (
		<TouchableOpacity {...prepareRootProps(style)}>
			<Ionicons
				style={{
					color: checked === true ? style.checkboxTickColor : style.checkboxDefaultColor,
					fontSize: style.CheckboxFontSize,
					lineHeight: style.CheckboxIconSize,
					marginTop: style.CheckboxIconMarginTop,
					textShadowRadius: style.checkboxTextShadowRadius,
				}}
				name={itsIOS && platformStyle !== "material" ? "ios-checkmark" : "md-checkmark"}
			/>
		</TouchableOpacity>
	)
}

if (__DEV__) {
	const { array, bool, func, number, object, oneOfType, string } = require("/utils/propTypes")
	CheckBox.propTypes = {
		...TouchableOpacity.propTypes,
		style: oneOfType([object, number, array]),
		checked: bool,
		onPress: func,
	}
}

module.exports = connectStyle(CheckBox, MODULE_NAME$)
