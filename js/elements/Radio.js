const MODULE_NAME$ = "elements/Radio"
console.debug(MODULE_NAME$)

const PropTypes = require("prop-types")
const { TouchableOpacity, Platform } = require("react-native")
const Ionicons = require("react-native-vector-icons/Ionicons").default

const { useState, useStore, useThis } = require("/hooks")
const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")
const variable = require("/styles/themes/default")

const Radio = props => {
	const [theme] = useStore("theme")

	const prepareRootProps = () => {
		const defaultProps = {
			standardStyle: false,
		}
		return computeProps(props, defaultProps)
	}

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable

	return (
		<TouchableOpacity {...prepareRootProps()}>
			{Platform.OS === "ios" && !props.standardStyle ? (
				props.selected && (
					<Ionicons
						style={{
							color: props.selectedColor ? props.selectedColor : variables.radioColor,
							lineHeight: 25,
							height: 20,
							fontSize: variables.radioBtnSize,
						}}
						name="ios-checkmark"
					/>
				)
			) : (
				<Ionicons
					style={{
						color:
							Platform.OS === "ios"
								? props.selected
									? props.selectedColor
										? props.selectedColor
										: variables.radioColor
									: props.color
									? props.color
									: undefined
								: props.selected
								? props.selectedColor
									? props.selectedColor
									: variables.radioSelectedColorAndroid
								: props.color
								? props.color
								: undefined,
						lineHeight: variables.radioBtnLineHeight,
						fontSize: variables.radioBtnSize,
					}}
					name={
						Platform.OS === "ios"
							? props.selected
								? "ios-radio-button-on"
								: "ios-radio-button-off"
							: props.selected
							? "md-radio-button-on"
							: "md-radio-button-off"
					}
				/>
			)}
		</TouchableOpacity>
	)
}

Radio.propTypes = {
	...TouchableOpacity.propTypes,
	selected: PropTypes.bool,
	standardStyle: PropTypes.bool,
}

module.exports = connectStyle(Radio, MODULE_NAME$)
