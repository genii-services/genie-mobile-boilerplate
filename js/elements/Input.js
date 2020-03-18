console.debug("Input", "load")

const React = require("react")
const PropTypes = require("prop-types")
const { TextInput } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")
const variable = require("/styles/themes/default")

const NativeBaseComponent = require("./NativeBaseComponent")

class Input extends NativeBaseComponent {
	render() {
		const { props } = this
		const variables = this.context.theme ? this.context.theme["@@shoutem.theme/themeStyle"].variables : variable
		return (
			<TextInput
				ref={c => (this._root = this._textInput = c)}
				editable={!props.disabled}
				underlineColorAndroid="rgba(0,0,0,0)"
				placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : variables.inputColorPlaceholder}
				{...props}
			/>
		)
	}
}

Input.propTypes = {
	...TextInput.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle("NativeBase.Input", {}, mapPropsToStyleNames)(Input)
