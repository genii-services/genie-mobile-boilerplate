const MODULE_NAME$ = "elements/Checkbox"
console.debug(MODULE_NAME$)

const React = require("react")
const PropTypes = require("prop-types")
const { TouchableOpacity } = require("react-native")
const Ionicons = require("react-native-vector-icons/Ionicons")

const { useStore } = require("/hooks")
const { connectStyle } = require("/utils/style")
const variable = require("/styles/themes/default")
const computeProps = require("../utils/computeProps")
const { itsIOS } = require("/utils/device")

const CheckBox = props => {
	const [theme] = useStore("theme")

	const getInitialStyle = variables => {
		const { color, checked } = props
		return {
			checkStyle: {
				borderColor: color || variables.checkboxBgColor,
				backgroundColor: checked === true ? color || variables.checkboxBgColor : variables.checkboxDefaultColor,
			},
		}
	}

	const prepareRootProps = variables => {
		const defaultProps = {
			style: getInitialStyle(variables).checkStyle,
		}
		return computeProps(props, defaultProps)
	}

	const { checked } = props
	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	const platformStyle = variables.platformStyle
	const platform = variables.platform
	return (
		<TouchableOpacity {...prepareRootProps(variables)}>
			<Ionicons
				style={{
					color: checked === true ? variables.checkboxTickColor : variables.checkboxDefaultColor,
					fontSize: variables.CheckboxFontSize,
					lineHeight: variables.CheckboxIconSize,
					marginTop: variables.CheckboxIconMarginTop,
					textShadowRadius: variables.checkboxTextShadowRadius,
				}}
				name={itsIOS && platformStyle !== "material" ? "ios-checkmark" : "md-checkmark"}
			/>
		</TouchableOpacity>
	)
}

CheckBox.propTypes = {
	...TouchableOpacity.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	checked: PropTypes.bool,
	onPress: PropTypes.func,
}

module.exports = connectStyle(CheckBox, MODULE_NAME$)
