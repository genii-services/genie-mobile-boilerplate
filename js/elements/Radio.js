const MODULE_NAME$ = "elements/Radio"
console.debug(MODULE_NAME$)

const { TouchableOpacity } = require("react-native")
const Ionicons = require("react-native-vector-icons/Ionicons").default

const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")
const { itsIOS } = require("/utils/device")
const { useStore } = require("/hooks")

const Radio = props => {
	const [theme] = useStore("theme")

	const defaultProps = {
		standardStyle: false,
	}
	const rootProps = computeProps(props, defaultProps)

	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle
	const iosIconStyle = {
		color: props.selectedColor ? props.selectedColor : style.radioColor,
		lineHeight: 25,
		height: 20,
		fontSize: style.radioBtnSize,
	}
	const iconStyle = {
		color: itsIOS
			? props.selected
				? props.selectedColor
					? props.selectedColor
					: style.radioColor
				: props.color
				? props.color
				: undefined
			: props.selected
			? props.selectedColor
				? props.selectedColor
				: style.radioSelectedColorAndroid
			: props.color
			? props.color
			: undefined,
		lineHeight: style.radioBtnLineHeight,
		fontSize: style.radioBtnSize,
	}

	const iconName = itsIOS
		? props.selected
			? "ios-radio-button-on"
			: "ios-radio-button-off"
		: props.selected
		? "md-radio-button-on"
		: "md-radio-button-off"

	return (
		<TouchableOpacity {...rootProps}>
			{itsIOS && !props.standardStyle ? (
				props.selected && <Ionicons style={iosIconStyle} name="ios-checkmark" />
			) : (
				<Ionicons style={iconStyle} name={iconName} />
			)}
		</TouchableOpacity>
	)
}

if (__DEV__) {
	const { bool } = require("/utils/propTypes")
	Radio.propTypes = {
		...TouchableOpacity.propTypes,
		selected: bool,
		standardStyle: bool,
	}
}

module.exports = connectStyle(Radio, MODULE_NAME$)
