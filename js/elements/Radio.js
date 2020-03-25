const MODULE_NAME$ = "elements/Radio"
console.debug(MODULE_NAME$)

const { TouchableOpacity, Platform } = require("react-native")
const Ionicons = require("react-native-vector-icons/Ionicons").default

const { useState, useStore, useThis } = require("/hooks")
const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const Radio = props => {
	const [theme] = useStore("theme")

	const prepareRootProps = () => {
		const defaultProps = {
			standardStyle: false,
		}
		return computeProps(props, defaultProps)
	}

	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle

	return (
		<TouchableOpacity {...prepareRootProps()}>
			{Platform.OS === "ios" && !props.standardStyle ? (
				props.selected && (
					<Ionicons
						style={{
							color: props.selectedColor ? props.selectedColor : style.radioColor,
							lineHeight: 25,
							height: 20,
							fontSize: style.radioBtnSize,
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

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")

	Radio.propTypes = {
		...TouchableOpacity.propTypes,
		selected: bool,
		standardStyle: bool,
	}
}

module.exports = connectStyle(Radio, MODULE_NAME$)
