const MODULE_NAME$ = "RadioElement"
console.debug(MODULE_NAME$)

const { TouchableOpacity } = require("react-native")
const Ionicons = require("react-native-vector-icons/Ionicons").default

const { itsIOS } = require("/utils/device")
const { useStyle } = require("/coordinators")

const RadioElement = ({ color, selected, selectedColor, standardStyle = false }) => {
	const { stylez } = useStyle(MODULE_NAME$, { color, selected, selectedColor }, defaultStyle => ({
		iosIcon: {
			color: selectedColor ? selectedColor : defaultStyle.radioColor,
			lineHeight: 25,
			height: 20,
			fontSize: defaultStyle.radioBtnSize,
		},
		icon: {
			color: itsIOS
				? selected
					? selectedColor
						? selectedColor
						: defaultStyle.radioColor
					: color
					? color
					: undefined
				: selected
				? selectedColor
					? selectedColor
					: defaultStyle.radioSelectedColorAndroid
				: color
				? color
				: undefined,
			lineHeight: defaultStyle.radioBtnLineHeight,
			fontSize: defaultStyle.radioBtnSize,
		},
	}))

	const iconName = itsIOS
		? selected
			? "ios-radio-button-on"
			: "ios-radio-button-off"
		: selected
		? "md-radio-button-on"
		: "md-radio-button-off"

	return (
		<TouchableOpacity {...rootProps}>
			{itsIOS && !standardStyle ? (
				selected && <Ionicons style={stylez.iosIcon} name="ios-checkmark" />
			) : (
				<Ionicons style={stylez.icon} name={iconName} />
			)}
		</TouchableOpacity>
	)
}

if (__DEV__) {
	const { bool } = require("/utils/propTypes")
	RadioElement.propTypes = {
		...TouchableOpacity.propTypes,
		selected: bool,
		standardStyle: bool,
	}
}

RadioElement.displayName = "Radio"

// const { connectStyle } = require("/utils/style")
module.exports = RadioElement //connectStyle(RadioElement, MODULE_NAME$)
